# masiwei-chime
> 马思唯整点报时

## features
- [ ] 报时语音播报
- [x] 定时提醒 
- [x] 自定义模板
- [x] 自定义报时名称
- [x] 自定义时间格式
- [x] 可复制提示语句
- [x] 可追加首部和尾部增加文字

## Configuration
### msw.name
`type: string`

报时人名称
### msw.timeFormat
`type: string`

报时时间格式

参照dayjs的[Format](https://dayjs.gitee.io/docs/zh-CN/display/format)
### msw.extra
`type: Object`

报时模板追加首部和尾部增加文字:
* before: 模板字符串首部增加字符串
* after: 模板字符串尾部增加字符串
### msw.customTemplate
`type: Object`

增加自定义模板:
* only: 是否只是用自定义模板
* tmpls: 自定义模板数组
#### 模板占位符
| 占位符        | 说明                 |
| ------------ | --------------      |
| $$name       |  报时人名称           |
| $$time       |  报时时间            |
| $$before     |  模板前缀            |
| $$after      |  模板后缀            |

#### e.g.
```javascript
"‌‌$$before后来，只要我还有人陪，我也不知道我爱谁。Life is fucking movie。人生如戏啊，靓仔。$$name，现在是$$time。$$after"
```
### msw.reminder
`type: Object`

增加自定义定时提醒:
* only: 是否只在规定时间内提醒
* times: 定时
#### 定时格式
HH:mm
### msw.autoSpeech
是否自动语音播报(未实现)

## 触发命令
```
masiwei-chime.chime
```