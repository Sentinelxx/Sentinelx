import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create some sample users
  const user1 = await prisma.user.upsert({
    where: { walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
    update: {},
    create: {
      walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { walletAddress: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac' },
    update: {},
    create: {
      walletAddress: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac',
    },
  })

  const user3 = await prisma.user.upsert({
    where: { walletAddress: '0x7be8076f4ea4a4ad08075c2508e481d6c946d12b' },
    update: {},
    create: {
      walletAddress: '0x7be8076f4ea4a4ad08075c2508e481d6c946d12b',
    },
  })

  // Create sample audits with transaction hashes
  const audit1 = await prisma.audit.upsert({
    where: { transactionHash: '0xabc123def456789012345678901234567890abcdef1234567890abcdef123456' },
    update: {},
    create: {
      contractName: 'TokenVault',
      contractAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      transactionHash: '0xabc123def456789012345678901234567890abcdef1234567890abcdef123456',
      score: 87,
      status: 'Completed',
      scanDuration: '3m 42s',
      userId: user1.id,
      criticalIssues: 0,
      highIssues: 2,
      mediumIssues: 3,
      lowIssues: 5,
      informationalIssues: 3,
    },
  })

  const audit2 = await prisma.audit.upsert({
    where: { transactionHash: '0xdef456abc789012345678901234567890abcdef1234567890abcdef123456789' },
    update: {},
    create: {
      contractName: 'LiquidityPool',
      contractAddress: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac',
      transactionHash: '0xdef456abc789012345678901234567890abcdef1234567890abcdef123456789',
      score: 92,
      status: 'Completed',
      scanDuration: '2m 18s',
      userId: user2.id,
      criticalIssues: 0,
      highIssues: 0,
      mediumIssues: 2,
      lowIssues: 4,
      informationalIssues: 2,
    },
  })

  const audit3 = await prisma.audit.upsert({
    where: { transactionHash: '0x789012def456abc345678901234567890abcdef1234567890abcdef123456abc' },
    update: {},
    create: {
      contractName: 'NFTMarketplace',
      contractAddress: '0x7be8076f4ea4a4ad08075c2508e481d6c946d12b',
      transactionHash: '0x789012def456abc345678901234567890abcdef1234567890abcdef123456abc',
      score: 76,
      status: 'Completed',
      scanDuration: '4m 15s',
      userId: user3.id,
      criticalIssues: 0,
      highIssues: 3,
      mediumIssues: 4,
      lowIssues: 6,
      informationalIssues: 5,
    },
  })

  const audit4 = await prisma.audit.upsert({
    where: { transactionHash: '0x456789abc012def345678901234567890abcdef1234567890abcdef123456def' },
    update: {},
    create: {
      contractName: 'StakingRewards',
      contractAddress: '0x9e5a52f57b3038f1b8edc782a5f9b55593e4cb93',
      transactionHash: '0x456789abc012def345678901234567890abcdef1234567890abcdef123456def',
      score: 95,
      status: 'Completed',
      scanDuration: '1m 55s',
      userId: user1.id,
      criticalIssues: 0,
      highIssues: 0,
      mediumIssues: 1,
      lowIssues: 3,
      informationalIssues: 4,
    },
  })

  // Create vulnerabilities for audits
  await prisma.vulnerability.createMany({
    data: [
      {
        name: 'Reentrancy',
        description: 'Potential reentrancy vulnerability in withdraw function',
        severity: 'High',
        location: 'TokenVault.sol:156-178',
        category: 'Reentrancy',
        confidence: 92,
        auditId: audit1.id,
      },
      {
        name: 'Access Control',
        description: 'Insufficient access control on admin functions',
        severity: 'Medium',
        location: 'TokenVault.sol:45-67',
        category: 'Access Control',
        confidence: 87,
        auditId: audit1.id,
      },
      {
        name: 'Oracle Manipulation',
        description: 'Price oracle can be manipulated through flash loans',
        severity: 'High',
        location: 'LiquidityPool.sol:342-367',
        category: 'Oracle Manipulation',
        confidence: 85,
        auditId: audit2.id,
      },
      {
        name: 'Front-Running',
        description: 'Transaction ordering dependency vulnerability',
        severity: 'High',
        location: 'NFTMarketplace.sol:123-145',
        category: 'Front-Running',
        confidence: 79,
        auditId: audit3.id,
      },
    ],
  })

  // Create AI insights
  await prisma.aiInsight.createMany({
    data: [
      {
        title: 'Potential Reentrancy in TokenVault',
        description: 'AI detected a potential reentrancy vulnerability in the withdraw function. Consider implementing a reentrancy guard.',
        severity: 'High',
        confidence: 92,
        location: 'TokenVault.sol:156-178',
        category: 'Security',
        auditId: audit1.id,
      },
      {
        title: 'Centralization Risk in Admin Functions',
        description: 'Multiple critical functions rely on a single admin address. Consider implementing a multi-signature approach.',
        severity: 'Medium',
        confidence: 87,
        location: 'Multiple contracts',
        category: 'Governance',
        auditId: audit1.id,
      },
      {
        title: 'Timestamp Dependence',
        description: 'Contract relies on block.timestamp for critical operations. Consider using more secure time measurement.',
        severity: 'Medium',
        confidence: 79,
        location: 'LiquidityPool.sol:203-215',
        category: 'Time',
        auditId: audit2.id,
      },
      {
        title: 'Potential Flash Loan Attack Vector',
        description: 'Price calculation mechanism could be vulnerable to flash loan attacks. Consider implementing price oracle.',
        severity: 'High',
        confidence: 85,
        location: 'LiquidityPool.sol:342-367',
        category: 'DeFi',
        auditId: audit2.id,
      },
    ],
  })

  // Create audit metrics
  await prisma.auditMetrics.createMany({
    data: [
      {
        codeCoverage: 92,
        testCoverage: 87,
        documentation: 76,
        bestPractices: 89,
        gasOptimization: 85,
        securityScore: 87,
        auditId: audit1.id,
      },
      {
        codeCoverage: 95,
        testCoverage: 91,
        documentation: 82,
        bestPractices: 94,
        gasOptimization: 88,
        securityScore: 92,
        auditId: audit2.id,
      },
      {
        codeCoverage: 78,
        testCoverage: 72,
        documentation: 65,
        bestPractices: 81,
        gasOptimization: 74,
        securityScore: 76,
        auditId: audit3.id,
      },
      {
        codeCoverage: 97,
        testCoverage: 94,
        documentation: 89,
        bestPractices: 96,
        gasOptimization: 92,
        securityScore: 95,
        auditId: audit4.id,
      },
    ],
  })

  // Create vulnerability types for analytics
  await prisma.vulnerabilityType.createMany({
    data: [
      { name: 'Reentrancy', severity: 'High', count: 3, category: 'Security' },
      { name: 'Access Control', severity: 'Medium', count: 5, category: 'Security' },
      { name: 'Integer Overflow', severity: 'Medium', count: 2, category: 'Arithmetic' },
      { name: 'Front-Running', severity: 'High', count: 4, category: 'MEV' },
      { name: 'Oracle Manipulation', severity: 'Critical', count: 1, category: 'DeFi' },
      { name: 'Unchecked Return Values', severity: 'Low', count: 7, category: 'Best Practice' },
      { name: 'Gas Optimization', severity: 'Informational', count: 8, category: 'Optimization' },
    ],
  })

  // Create global stats
  await prisma.globalStats.upsert({
    where: { id: 'global-stats-1' },
    update: {},
    create: {
      id: 'global-stats-1',
      totalAudits: 4,
      totalVulnerabilities: 30,
      totalVulnerabilitiesFixed: 18,
      averageSecurityScore: 87.5,
      totalContractsScanned: 4,
      criticalVulns: 1,
      highVulns: 9,
      mediumVulns: 10,
      lowVulns: 18,
      informationalVulns: 14,
    },
  })

  console.log('✅ Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
