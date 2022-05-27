export const zhList =  {
  //头部
  Header: {
    Home: '首页',
    Swap: '兑换',
    Pool: '流动性池',
    Liquidity: '流动性挖矿',
    Trading: '交易挖矿',
    Boardroom: '董事会',
    Bridge: '跨链桥',
    Chart: '行情',
    Buyback: '燃烧黑洞',
    News: '公告',
    IMO: 'IMO',
    Farm: 'Farm',
    Connect: '连接'
  },
  // 底部
  Footer: {
    Application: '申请',
    ACText1: '上币申请',
    ACText2: '申请流动性激励',
    ACText3: 'IMO申请',
    ACText4: 'MDEX生态基金申请',
    Guide: '网站导航',
    GUText1: '兑换',
    GUText2: '流动性池',
    GUText3: 'info',
    GUText4: '流动性挖矿',
    GUText5: '董事会',
    GUText6: '交易挖矿',
    Doc: '文档',
    DOText1: 'FAQ',
    DOText2: 'API',
    Guidance: '用户使用指南',
    About: '关于',
    ABText1: '公告',
    ABText2: '矿池调整',
    ABText3: '生态基金',
    Vulnerability: '漏洞赏金计划',
    ABText4: '商务合作: business@mdex.com',
    Reserved: '@2021 Mdex.com.All rights reserved'
  },
  // 主图
  Banner: {
    Title: (coin='XX') => { return `${coin}当前数据统计(BSC&HECO)` }, //
    account1: (coin='XX') => { return `当期${coin}参与人数：` }, //
    account2: (coin='XX') => { return `当期${coin}质押数量：` }, //
    Introduce: '5月25日20:00正式开启',
    Rollout: '即将开始的精选项目：',
    ShowProject: '查看所有项目',
    CardTitle: 'IMO项目？',
    StartStatus: '敬请期待',
    Start: '开始'
  },
  // 首页/详情-tab切换
  Tab: {
    Processing: '进行中',
    Start: '即将开始',
    Participated: '我参与的',
    Info: 'IMO信息',
    Description: '项目简介',
    MyIn: '我的质押记录', //
    IMOs: 'IMOs',
    Over: '已结束',
    Lockup: '锁仓中',
  },
  // 首页/详情-项目
  Active: {
    Tips: 'IMO通过质押打新的形式，将新资产代币全部奖励给质押MDX或xMDX用户，质押期间董事会部分收益将销毁',
    ComeS: '即将开始',
    Progress: '进行中',
    Lockup: '锁仓中',
    Inli: '清算中',
    Over: '已结束',
    AirdropAmount: '奖励总金额',
    AirdropPrice: '奖励代币价格',
    Begin: '质押开始时间',
    End: '质押结束时间',
    PledgeEnd: '距离质押结束：',
    LockEndTime: '锁仓结束时间',
    LockEndTimeDec: (height=66666) => {return `锁仓结束区块高度：${height}锁仓结束时间是在质押结束时间基础上加上锁仓时长预估的时间，实际的锁仓结束时间需要以锁仓结束区块高度为准`},
    Participate: '已参与',
    PledgeAmount: '质押数量',
    EstimateLockTime: '预计锁仓时长',
    LockupTime: '剩余锁仓时长',
    PopText1: 'IMO质押币种为:',
    BeginDesc: '暂定BeginTips',
    EndDesc: '暂定EndTips',
    EstimateLockDesc: '预计锁仓时长是根据质押在IMO池中的凭证数量动态计算的，质押的凭证数量越多，锁仓时长越短',
    LockDesc: (height=66666) => {return `锁仓结束区块高度：${height}, 剩余锁仓时长是根据锁仓区块数据预估的时间，实际锁仓时长需要以区块高度为准`},
    ClearTips: '合约正在清算每位用户的空投奖励，待清算完成后可以提取奖励',
    EndTips: 'IMO已结束，请及时提取奖励和本金',
    UnLockup: '已解锁',
    MyPledge: '我的质押',
    MyShare: '我的份额',
    AwardAmount: '奖励代币数',
    Unlimited: '不限',
    Calculate: '计算中',
    Stipulation: '约',
    InliDesc: '预计清算完成时间：09.17 20:00 SGT，清算完成后才可以提取新币奖励，本金在锁仓结束后即可领取'
  },
  // 首页问答
  explana: {
    OneAsk: '参与IMO前需要准备什么？',
    OneAnswer1: '1. 下载钱包：电脑端：Metamask， 手机端：imToken、Math Wallet、BitKeep、O3 Swap、Token Pocket',
    OneAnswer2: '2. 钱包创建和HECO/BSC网络配置',
    OneAnswer3: '3.  购买MDX',
    OneAnswer4: '4.  质押MDX 获取锁仓凭证 xMDX',
    TwoAsk: '如何参与IMO？',
    TwoAnswer1: '1. 选择进行中的IMO项目，质押目标MDX或xMDX即可获得新币奖励',
    TwoAnswer2: '2. 合约将根据质押的凭证数量，动态计算锁仓时间，质押期完成后，将进入锁仓期。',
    TwoAnswer3: '3. 用户在锁仓期结束后才能提取本金',
    ThreeAsk: '什么时候可以获取项目token？',
    ThreeAnswer1: 'IMO 清算完成（根据项目方代币发放情况而定）后，在项目详情页一键获取你的新币奖励',
    FourAsk: 'IMO 常见问题',
    FourAnswer1: 'IMO 需要锁仓多久？',
    FourAnswer2: '需要扣除多少董事会收益？',
    Apply: '立即申请',
    FotText: '您的项目准备好在MDEX上参与IMO吗？',
    Poratal: '如何参与IMO',
    Iap: '如何参与IMO'
  },
  // 项目详情-信息
  Info: {
    IMOif: 'IMO 信息',
    Begin: '质押开始时间 :',
    End: '质押结束时间 :',
    Award: 'IMO奖励金额 :',
    Price: '代币初始价格 :',
    Destroy: '销毁MDX数量 :',
    Tokenif: '代币信息',
    CoinName: '代币名称 :',
    AwardAccount: '奖励代币数量 :',
    TotalSupply: '总供应量 :',
    ToAdr: '代币合约地址 :',
    AddCoin: (coin='XX') => { return `将${coin}添加至MetaMask` } 
  },
  // 项目详情-描述
  Desc: {
    ProName: '项目名称',
    ProDes: '项目简介',
    Contact: '联系项目方',
    WebSide: '官网:',
    Twitter: '推特:'
  },
  // 项目详情-参与记录
  Investment: {
    PledgeMoney: '总质押数量',
    MyShare: '我的份额',
    RewardAmount: '奖励代币数',
    PledgeHistory: '质押记录',
    DestroyIncome: '我销毁的收益'
  },
  // 按钮
  Btn: {
    Confirming: '确认中',
    Acquired: '已领取',
    Claim: '获取资产',
    Trade: '去交易',
    Approve: '授权',
    Approving: '授权中',
    Confirm: '确认',
    Pii: '质押 ',
    Mam: '添加流动性',
  },
  // 弹框
  Pop: {
    Buco: '商务合作',
    Notice: '公告',
    ToIn: '共投入:',
    Retrieve: '兑换',
    Get: '获取',
    Gypa: '获取你的项目资产',
    Unas: '未中签资产:',
    Ana: '获取新资产:',
    Inus: '质押',
    Available: '可用',
    Topic: '你的LP余额不足，请先获得LP',
    Limit: '个人质押限额：',
    Approve: '授权',
    success: '成功',
    error: '失败',
    Inveset: '投入',
    ViewOn: '查看交易记录',
    Already: '已质押：',
    And: '和',
    Warning: '资产清算中，您暂时只能取回未中签资产，中签资产预计24小时后可以取回',
    Extract: '提取',
    AirdropAwarn: '奖励：',
    PledgeAmount: '已质押数量:',
    ExtractIncome: '提取收益',
    ExtractPrincipal: '提取本金',
    ClaimTextTitle: 'DMT代币将通过HECO网络发放到当前地址，请按如下操作查看：',
    ClaimText1: '1.将当前网络切换到HECO网络',
    ClaimText2: '2.复制代币合约地址并在钱包添加资产',
    ContractAddress: '代币合约地址：',
  },
  // 补充
  Supplement: {
    Return: '首页' ,
    Product: '项目',
    Loading: '加载中',
    Nodata: '暂无数据',
    ProductList: '项目列表'
  },
  // 校验
  Check: {
    MinLimit: '低于最低兑换限额，请重新输入',
    MaxLimit: '超过最大可兑换限额，请重新输入',
    Topic: '你的余额不足，请先获得',
  },
  // 侧边栏
  Slide: {
    Apply: '上币申请',
    Fluidity: '申请流动性激励',
    Fund: 'MDEX生态基金申请',
    Notice: '公告',
    Repurchase: '回购销毁',
    Bridge: '跨链桥'
  }
}
