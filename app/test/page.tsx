// //@ts-nocheck
// "use client"
// import React, { useEffect, useRef } from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import hljs from 'highlight.js';
// import 'highlight.js/styles/github.css'; // Import a clean highlighting style
// import { solidity } from 'highlightjs-solidity'; // Correct import for Solidity highlighting (from third-party package)
// import { Packer } from 'docx'; // For DOCX generation
// import { Document, Paragraph, TextRun, HeadingLevel } from 'docx'; // DOCX components
// import { saveAs } from 'file-saver'; // For saving the file

// hljs.registerLanguage('solidity', solidity);

// export default function Page() {  // Capitalized 'Page' for consistency
//     const response = {
//       "response": "# Smart Contract Audit Report\n\n## Executive Summary\nThe provided Solidity code defines a set of contracts, including a primary `VulnerableEscrow`, an inherited `ChildEscrow`, and a `StorageBug` contract. The purpose appears to be an escrow system for holding and managing funds, alongside a contract demonstrating a storage manipulation vulnerability.\n\nThe audit identified several critical vulnerabilities that expose the contracts to severe risks, including unauthorized fund drainage, contract destruction, and arbitrary state manipulation.\n\n- **Total issues found**: 5 (5 High)\n- **Overall security assessment**: High risk. The contracts are not safe for deployment in their current state.\n\n## Methodology\nThe analysis was conducted by cross-referencing the provided Solidity code against a comprehensive list of known vulnerability detectors. The review also simulated a manual code walkthrough to provide context-specific explanations and recommendations.\n\n## Detected Issues\n\n### Issue #1: Multiple constructor schemes\n- **Description**: The `VulnerableEscrow` contract defines both a new-style `constructor()` and an old-style constructor named `function VulnerableEscrow()`. With `pragma solidity ^0.8.0`, the function `VulnerableEscrow()` is not treated as a constructor but as a regular, public function. This means any user can call `VulnerableEscrow()` after deployment, which would re-assign the `owner` variable.\n  ```solidity\n  contract VulnerableEscrow {\n      address public owner;\n      // ...\n  \n      function VulnerableEscrow() public { // Old-style constructor, treated as a regular function in 0.8.x\n          owner = msg.sender;\n      }\n  \n      constructor() { // New-style constructor\n          isInitialized = true;\n      }\n      // ...\n  }\n  ```\n- **Impact**: High. An attacker can call the public `VulnerableEscrow()` function to take ownership of the contract at any time.\n- **Confidence**: High.\n- **Location**: `VulnerableEscrow` contract, lines 5-7.\n- **Recommendation**: Remove the old-style constructor (`function VulnerableEscrow()`). The new-style `constructor()` is sufficient and correctly implemented for versions 0.4.22 and above. The owner initialization should be moved into the official `constructor`.\n\n### Issue #2: Suicidal\n- **Description**: The `destroy()` function in the `VulnerableEscrow` contract contains a call to `selfdestruct`. This function is `public` and lacks any access control, allowing any external account to call it.\n  ```solidity\n  function destroy() public {\n      selfdestruct(payable(msg.sender));\n  }\n  ```\n- **Impact**: High. Any user can destroy the contract, which will irretrievably delete its bytecode from the blockchain and forcibly send all of its Ether balance to the caller. All funds held in escrow for other users will be lost to the attacker.\n- **Confidence**: High.\n- **Location**: `VulnerableEscrow.destroy()`.\n- **Recommendation**: Protect the `destroy()` function by restricting its access to only the contract owner. This can be achieved by adding an `onlyOwner` modifier.\n\n### Issue #3: Controlled Delegatecall\n- **Description**: The `executeDelegate()` function allows a user to provide an arbitrary `target` address and `data` to execute a `delegatecall`. `delegatecall` executes code from the `target` contract within the context of the calling contract (`VulnerableEscrow`). Since the `target` is user-controlled, an attacker can deploy a malicious contract and have `VulnerableEscrow` execute its code.\n  ```solidity\n  function executeDelegate(address target, bytes calldata data) public {\n      (bool success, ) = target.delegatecall(data);\n      require(success, \"Delegatecall failed\");\n  }\n  ```\n- **Impact**: High. An attacker can use this function to take complete control of the `VulnerableEscrow` contract's state, including stealing all funds, changing the owner, or destroying the contract by calling `selfdestruct` from the malicious implementation.\n- **Confidence**: Medium.\n- **Location**: `VulnerableEscrow.executeDelegate()`.\n- **Recommendation**: Avoid using `delegatecall` with user-controlled target addresses. If this functionality is essential, use a whitelist of trusted contract addresses that can be called, and ensure access to the function itself is strictly controlled (e.g., `onlyOwner`).\n\n### Issue #4: State variable shadowing\n- **Description**: The `ChildEscrow` contract inherits from `VulnerableEscrow` and declares its own state variable named `owner`. This variable \"shadows\" or hides the `owner` variable from the parent `VulnerableEscrow` contract. The `onlyOwner` modifier in `ChildEscrow` references this new, shadowed `owner`, not the one from the base contract. This breaks the intended ownership logic.\n  ```solidity\n  contract VulnerableEscrow {\n      address public owner; // Parent's owner\n      //...\n  }\n  \n  contract ChildEscrow is VulnerableEscrow {\n      address owner; // Child's owner - shadows the parent's\n  \n      constructor() {\n          owner = msg.sender; // Initializes the child's owner\n      }\n  \n      modifier onlyOwner() {\n          require(msg.sender == owner, \"Not owner\"); // Checks against the child's owner\n          _;\n      }\n      //...\n  }\n  ```\n- **Impact**: High. The access control in `ChildEscrow` does not function as expected. Functions in `VulnerableEscrow` that might be intended to be controlled by its `owner` are unprotected, while functions in `ChildEscrow` like `emergencyWithdraw` are controlled by a completely different `owner` variable. This will lead to logical errors and security bypasses.\n- **Confidence**: High.\n- **Location**: `ChildEscrow` contract.\n- **Recommendation**: Remove the `owner` state variable from `ChildEscrow` to ensure it uses the `owner` variable from the parent `VulnerableEscrow` contract as intended. The parent's owner should be set in the `ChildEscrow` constructor via `VulnerableEscrow.owner = msg.sender;` or by initializing it in the parent constructor.\n\n### Issue #5: Uninitialized storage variables\n- **Description**: In the `StorageBug` contract, the function `buggedFunction` declares a local `struct` variable `user` with the `storage` keyword but does not initialize it. Uninitialized local storage variables default to pointing to storage slot 0. In this contract, the state variable `admin` is located at slot 0. Therefore, assigning a value to `user.id` will overwrite the value of the `admin` variable.\n  ```solidity\n  contract StorageBug {\n      address public admin = msg.sender; // At storage slot 0\n      struct UserData {\n          uint256 id;\n      }\n  \n      function buggedFunction() public {\n          UserData storage user; // Uninitialized, points to slot 0\n          user.id = 0; // This overwrites the 'admin' address with 0\n      }\n  }\n  ```\n- **Impact**: High. Any user calling `buggedFunction` will inadvertently (or maliciously) corrupt critical state variables. In this case, the `admin` address will be zeroed out, potentially locking out administrative functions or bricking the contract.\n- **Confidence**: High.\n- **Location**: `StorageBug.buggedFunction()`.\n- **Recommendation**: Never declare uninitialized local storage variables. If you need to manipulate a struct in storage, you must point it to an existing state variable (e.g., `UserData storage user = users[msg.sender];`). If you only need a temporary variable for computation, declare it in `memory`.\n\n## Recommendations\n- **Implement Access Control**: Ensure all functions that perform critical actions (e.g., changing state, transferring funds, self-destructing) are protected with proper access control, such as an `onlyOwner` modifier.\n- **Follow Checks-Effects-Interactions Pattern**: The `withdraw` function is vulnerable to reentrancy. The state change (`balances[msg.sender] -= amount;`) should occur before the external call (`to.transfer(amount);`).\n- **Unit Testing**: Implement a comprehensive test suite that covers all functions and modifiers, paying special attention to failure cases, access control logic, and potential attack vectors like the ones identified in this report.\n\n## Conclusion\nThe audited contracts contain multiple high-severity vulnerabilities that render them unsuitable for production use. The combination of unprotected critical functions, state variable shadowing, and improper use of `delegatecall` and storage pointers creates significant risk of asset loss and contract takeover. The identified issues must be remediated before considering any deployment."
//     };
  
//     const data = response.response;
  
//     const reportRef = useRef(null); // Ref to the report container for DOCX export
  
//     useEffect(() => {
//       hljs.highlightAll(); // Highlight all code blocks after component mounts
//     }, [data]); // Re-run if data changes
  
//     const downloadDOCX = () => {
//       const lines = data.split('\n');
//       const children = [];
//       let inCodeBlock = false;
//       let codeLines = [];
//       let bulletLevel = 0;

//       lines.forEach((line) => {
//         if (line.trim() === '```solidity') {
//           inCodeBlock = true;
//           codeLines = [];
//           return;
//         } else if (line.trim() === '```' && inCodeBlock) {
//           inCodeBlock = false;
//           children.push(new Paragraph({
//             children: codeLines.map(codeLine => new TextRun({
//               text: codeLine,
//               font: 'Courier New',
//               size: 22, // 11pt font (docx uses half-points)
//               break: 1
//             })),
//             spacing: { before: 200, after: 200 }
//           }));
//           return;
//         }

//         if (inCodeBlock) {
//           codeLines.push(line + '\n');
//           return;
//         }

//         if (line.startsWith('# ')) {
//           children.push(new Paragraph({
//             text: line.replace('# ', ''),
//             heading: HeadingLevel.HEADING_1,
//             spacing: { before: 400, after: 200 },
//             children: [new TextRun({ text: line.replace('# ', ''), size: 32 })] // 16pt font
//           }));
//         } else if (line.startsWith('## ')) {
//           children.push(new Paragraph({
//             text: line.replace('## ', ''),
//             heading: HeadingLevel.HEADING_2,
//             spacing: { before: 300, after: 200 },
//             children: [new TextRun({ text: line.replace('## ', ''), size: 32 })] // 16pt font
//           }));
//         } else if (line.startsWith('### ')) {
//           children.push(new Paragraph({
//             text: line.replace('### ', ''),
//             heading: HeadingLevel.HEADING_3,
//             spacing: { before: 200, after: 100 },
//             children: [new TextRun({ text: line.replace('### ', ''), size: 32 })] // 16pt font
//           }));
//         } else if (line.startsWith('- **')) {
//           const text = line.replace('- **', '').replace('**:', ':').trim();
//           children.push(new Paragraph({
//             children: [
//               new TextRun({ text: text.split(':')[0] + ': ', bold: true, size: 22 }), // 11pt
//               new TextRun({ text: text.split(':')[1] || '', size: 22 }) // 11pt
//             ],
//             bullet: { level: 0 },
//             spacing: { before: 100, after: 100 }
//           }));
//         } else if (line.startsWith('- ')) {
//           children.push(new Paragraph({
//             text: line.replace('- ', ''),
//             bullet: { level: bulletLevel },
//             spacing: { before: 100, after: 100 },
//             children: [new TextRun({ text: line.replace('- ', ''), size: 22 })] // 11pt
//           }));
//         } else if (line.trim()) {
//           const textRuns = [];
//           let remaining = line;
//           while (remaining) {
//             const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
//             if (boldMatch) {
//               const before = remaining.substring(0, boldMatch.index);
//               if (before) textRuns.push(new TextRun({ text: before, size: 22 })); // 11pt
//               textRuns.push(new TextRun({ text: boldMatch[1], bold: true, size: 22 })); // 11pt
//               remaining = remaining.substring(boldMatch.index + boldMatch[0].length);
//             } else {
//               textRuns.push(new TextRun({ text: remaining, size: 22 })); // 11pt
//               remaining = '';
//             }
//           }
//           children.push(new Paragraph({
//             children: textRuns,
//             spacing: { before: 100, after: 100 }
//           }));
//         } else {
//           children.push(new Paragraph({ spacing: { before: 200 } })); // Empty line for spacing
//         }
//       });

//       const doc = new Document({
//         sections: [{
//           properties: { page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } } },
//           children,
//         }],
//       });

//       Packer.toBlob(doc).then((blob) => {
//         saveAs(blob, 'audit-report.docx');
//       }).catch((err) => {
//         console.error('Error generating DOCX:', err);
//       });
//     };
  
//     return (
//       <div>
//         <button 
//           onClick={downloadDOCX}
//           style={{
//             margin: '20px auto',
//             display: 'block',
//             padding: '10px 20px',
//             background: '#006400', // Green theme
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer'
//           }}
//         >
//           Download DOCX
//         </button>
//         <div 
//           ref={reportRef}
//           style={{
//             maxWidth: '800px',
//             margin: '20px auto',
//             padding: '20px',
//             background: 'white',
//             border: '1px solid #ddd',
//             fontFamily: 'Arial, sans-serif',
//             lineHeight: 1.6,
//             color: '#333',
//             borderRadius: '8px', // Added for prettier corners
//             boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' // Soft shadow for depth
//           }}
//         >
//           <ReactMarkdown
//             remarkPlugins={[remarkGfm]}
//             components={{
//               code: ({ node, inline, className, children, ...props }) => {
//                 const match = /language-(\w+)/.exec(className || '');
//                 return !inline && match ? (
//                   <pre {...props} style={{ background: '#f4f4f4', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
//                     <code className={className} style={{ fontFamily: 'Courier New, monospace' }}>{children}</code>
//                   </pre>
//                 ) : (
//                   <code className={className} {...props} style={{ background: '#f4f4f4', padding: '2px 4px', borderRadius: '4px' }}>
//                     {children}
//                   </code>
//                 );
//               },
//               h1: ({ children }) => <h1 style={{ color: '#006400', borderBottom: '1px solid #eee', marginTop: '20px' }}>{children}</h1>,
//               h2: ({ children }) => <h2 style={{ color: '#006400', borderBottom: '1px solid #eee', marginTop: '20px' }}>{children}</h2>,
//               h3: ({ children }) => <h3 style={{ color: '#006400', marginTop: '20px' }}>{children}</h3>,
//               ul: ({ children }) => <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>{children}</ul>,
//               ol: ({ children }) => <ol style={{ margin: '10px 0', paddingLeft: '20px' }}>{children}</ol>,
//               p: ({ children }) => <p style={{ margin: '10px 0' }}>{children}</p>,
//               strong: ({ children }) => <strong style={{ color: '#006400' }}>{children}</strong> // Green emphasis
//             }}
//           >
//             {data}
//           </ReactMarkdown>
//         </div>
//       </div>
//     );
//   }

import React from 'react'
import { ConnectWallet } from '@/components/wallet/ConnectWallet'

export default function page() {
  return (
    <div>
      <ConnectWallet />
    </div>
  )
}
