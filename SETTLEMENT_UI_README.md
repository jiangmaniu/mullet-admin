# 结算对账管理后台页面

## 概述

本模块实现了 Mullet v1.0 结算与对账系统的管理后台界面，包括财务流水看板和审计日志两个主要功能模块。

## 目录结构

```
mullet-manager/src/
├── pages/admin/settlement/
│   ├── financial-summary/          # 财务流水看板
│   │   ├── index.tsx               # 主页面组件
│   │   └── tableConfig.tsx         # 表格列配置
│   └── audit-logs/                 # 审计日志
│       ├── index.tsx               # 主页面组件
│       └── tableConfig.tsx         # 表格列配置
├── services/api/
│   └── settlement.ts               # 结算相关 API 服务
└── locales/
    ├── zh-TW/menu.ts               # 繁体中文菜单
    └── en-US/menu.ts               # 英文菜单
```

## 功能模块

### 1. 财务流水看板 (Financial Summary Dashboard)

**路径**: `/settlement/financial-summary`

**功能特性**:

- ✅ 财务汇总统计卡片
  - 累计充值金额
  - 累计提现金额
  - 当前账户余额
  - 待对账批次数量

- ✅ 对账任务列表
  - 批次ID（可复制）
  - 结算周期（开始-结束时间）
  - 交易笔数
  - 充值/提现金额统计
  - 净额计算
  - 对账状态（待对账/对账中/成功/失败/人工审核）
  - 不一致项数量高亮显示

- ✅ 可展开查看交易明细
  - 每个批次的具体充值/提现记录
  - 用户ID、金额、时间戳等详细信息

**表格字段**:

| 字段 | 类型 | 说明 |
|------|------|------|
| batchId | string | 批次ID（唯一标识） |
| startTime / endTime | timestamp | 结算周期起止时间 |
| transactionCount | number | 交易笔数 |
| totalDeposits | decimal | 充值总额 (USDT) |
| totalWithdrawals | decimal | 提现总额 (USDT) |
| netAmount | decimal | 净额 = 充值 - 提现 |
| status | enum | pending/processing/success/failed/manual_review |
| inconsistencies | number | 不一致项数量 |
| executionTime | timestamp | 执行时间 |
| remarks | text | 备注 |
| createdAt | timestamp | 创建时间 |
| transactions | array | 交易明细列表 |

### 2. 审计日志 (Audit Logs)

**路径**: `/settlement/audit-logs`

**功能特性**:

- ✅ 所有对账操作的审计追踪
- ✅ 支持按操作类型、批次ID、操作人、时间范围筛选
- ✅ 详细的操作上下文信息
  - 操作人信息（ID、姓名、角色）
  - IP地址和浏览器信息
  - 变更内容 JSON 详情

- ✅ 操作类型分类
  - 创建对账
  - 审核通过
  - 审核拒绝
  - 重新对账
  - 人工调整
  - 数据导出

**表格字段**:

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 日志ID |
| operationType | enum | settlement_create/approve/reject/retry/manual_adjustment/data_export |
| batchId | string | 关联的批次ID |
| operatorId | string | 操作人ID |
| operatorName | string | 操作人姓名 |
| operatorRole | string | 操作人角色 |
| description | text | 操作描述 |
| result | enum | success/failed |
| errorMessage | text | 错误信息（如果失败） |
| ipAddress | string | 操作IP地址 |
| userAgent | string | 浏览器信息 |
| changes | json | 变更内容详情 |
| createdAt | timestamp | 操作时间 |

## API 接口

所有接口定义在 `src/services/api/settlement.ts`：

### 1. 获取财务汇总

```typescript
GET /api/settlement/financial-summary
```

**返回**:
```json
{
  "success": true,
  "data": {
    "totalDeposits": 1000000.50,
    "totalWithdrawals": 800000.30,
    "totalBalance": 200000.20,
    "pendingSettlements": 5,
    "failedSettlements": 1
  }
}
```

### 2. 获取对账任务列表

```typescript
GET /api/settlement/tasks
```

**查询参数**:

- `current`: 当前页码
- `pageSize`: 每页数量
- `status`: 状态筛选
- `startTime`: 开始时间
- `endTime`: 结束时间

**返回**:
```json
{
  "success": true,
  "data": {
    "records": [...],
    "total": 100,
    "current": 1,
    "pageSize": 20
  }
}
```

### 3. 获取对账任务详情

```typescript
GET /api/settlement/tasks/{batchId}
```

### 4. 创建对账任务

```typescript
POST /api/settlement/tasks
```

**请求体**:
```json
{
  "startTime": "2024-01-01T00:00:00Z",
  "endTime": "2024-01-01T23:59:59Z"
}
```

### 5. 审核对账任务

```typescript
POST /api/settlement/tasks/{batchId}/approve
```

**请求体**:
```json
{
  "approved": true,
  "remarks": "审核通过"
}
```

### 6. 重新执行对账

```typescript
POST /api/settlement/tasks/{batchId}/retry
```

### 7. 获取审计日志

```typescript
GET /api/settlement/audit-logs
```

**查询参数**:

- `current`: 当前页码
- `pageSize`: 每页数量
- `operationType`: 操作类型
- `batchId`: 批次ID
- `operatorId`: 操作人ID
- `ipAddress`: IP地址
- `createdAt`: 时间范围

### 8. 导出对账数据

```typescript
GET /api/settlement/tasks/{batchId}/export
```

返回 Excel 文件下载。

### 9. 获取不一致项详情

```typescript
GET /api/settlement/tasks/{batchId}/inconsistencies
```

## 路由配置

在 `config/routes.ts` 中添加：

```typescript
{
  path: '/:lng/settlement',
  name: 'settlement',
  icon: 'icon-caidan-duizhang',
  code: 'settlement',
  routes: [
    {
      path: '/:lng/settlement/financial-summary',
      component: './admin/settlement/financial-summary',
      name: 'financial-summary',
      access: 'canAdmin',
      code: 'settlement:financial-summary'
    },
    {
      path: '/:lng/settlement/audit-logs',
      component: './admin/settlement/audit-logs',
      name: 'audit-logs',
      access: 'canAdmin',
      code: 'settlement:audit-logs'
    }
  ]
}
```

## 国际化

### 繁体中文 (zh-TW)

```typescript
'menu.settlement': '結算對賬',
'menu.settlement.financial-summary': '財務流水看板',
'menu.settlement.audit-logs': '審計日誌',
```

### 英文 (en-US)

```typescript
'menu.settlement': 'Settlement & Reconciliation',
'menu.settlement.financial-summary': 'Financial Summary Dashboard',
'menu.settlement.audit-logs': 'Audit Logs',
```

## 样式特性

- ✅ 使用 Ant Design Pro 组件库
- ✅ 响应式设计（支持移动端）
- ✅ Tailwind CSS 样式
- ✅ 数据可视化（统计卡片）
- ✅ 颜色编码（充值绿色、提现红色、警告橙色）
- ✅ 可展开行查看详细信息
- ✅ 复制粘贴支持（ID字段）
- ✅ 空状态友好提示

## 权限控制

所有页面需要 `canAdmin` 权限才能访问。后台需要配置对应的菜单权限码：

- `settlement` - 结算对账模块
- `settlement:financial-summary` - 财务流水看板
- `settlement:audit-logs` - 审计日志

## 下一步计划

### 后端实现（backend 项目）

需要在 `backend/src/routes/` 创建：

1. **settlement.ts** - 结算对账 API 路由
   - 实现上述所有 API 接口
   - 连接 PostgreSQL 查询 settlement_tasks、audit_logs 表
   - 实现分页、筛选、排序逻辑

2. **数据库表** (已规划)
   - `settlement_tasks` - 对账任务表
   - `audit_logs` - 审计日志表
   - `financial_summary` - 财务汇总表（可选，用于缓存）
   - `user_locks` - 用户锁表（防止并发修改）

### Watcher 服务实现

参考 Notion 文档实现：

- Check1: 金额一致性检查
- Check2: 余额快照验证
- Check3: 业务逻辑验证
- 24/7 后台运行的对账脚本

## 使用说明

1. **访问页面**
   ```
   http://localhost:8000/zh-TW/settlement/financial-summary
   http://localhost:8000/zh-TW/settlement/audit-logs
   ```

2. **查看财务汇总**
   - 页面顶部显示关键指标统计
   - 下方列表展示所有对账批次
   - 点击行可展开查看交易明细

3. **筛选数据**
   - 使用表格上方的搜索表单
   - 支持按状态、时间范围等筛选

4. **审计追踪**
   - 在审计日志页面查看所有操作记录
   - 展开行查看详细的变更内容和操作上下文

## 技术栈

- **框架**: UmiJS 4.x + React 18
- **UI 组件**: Ant Design Pro Components
- **状态管理**: MobX
- **样式**: Tailwind CSS + Less
- **国际化**: umi-plugin-locale
- **请求库**: umi-request

## 注意事项

⚠️ **重要提醒**:

1. 当前是前端页面骨架，**需要后端 API 实现**才能正常工作
2. 所有 API 接口路径为示例，需要根据实际后端路由调整
3. 数据结构（字段名、类型）需要与后端数据库表结构保持一致
4. 权限控制需要在后端也实现相应的鉴权逻辑
5. 建议先实现后端数据库表和 API，再测试前端页面

## 联系与支持

如有问题，请参考：

- [Notion 需求文档](https://www.notion.so/Mullet-v1-0-1680eb104dcd8019be00e6a85d050cca)