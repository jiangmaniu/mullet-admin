## 使用

> 部署不同平台时，把平台下的文件复制到 docker nginx 映射出来的目录

## manager

1. 按需修改配置文件 `web-trade-client/platform/config.json`

```json
{
  // 网站名称 (必填)
  "name": "Mullet",
  // 官网地址(选填)
  "websiteUrl": "www.mullet.top",
  // 客户端ID (必填)
  "CLIENT_ID": "MulletTrader-manager",
  // 客户端密钥 (必填)
  "CLIENT_SECRET": "mullet_trader_manager_secret",
  // websocket地址 (必填)
  "ws": "wss://websocket.mullet.top/websocketServer",
  // 图片域名前准
  "imgDomain": "https://file.mullet.top/trade/",
}
```

2. 按图片文件类型规则修改图片

- `platform/icons`
  - `icon-192x192.png`
  - `icon-384x384.png`
  - `icon-512x512.png`
- `platform/img` 按图片格式和大小替换图片即可
- `platform/favicon.ico` 网站ico图标