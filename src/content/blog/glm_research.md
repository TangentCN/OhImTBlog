---
title: "百炼GLM-5.2の奇妙冒险"
description: "多重ID，迷雾重重，费用最终导向何方？！"
pubDate: 2026-08-17
tags: ["OhImT匠心手作", "AI&API", "废话"]
---

## 序章：白嫖天堂的诞生和破碎&真假 GLM-5.2 的诞生

>*Dixitque Deus: 'Fiat API gratuita.' Et facta est API gratuita.*

自从发现学校 AI 大课提供的阿里云代金券不仅可以用来租服务器跑大模型（这也是它的本来用途），还能用来抵扣在阿里的百炼平台产生的 API 费用后，白嫖的乐园便向我敞开了！300元的代金券，除去 AI 大课大作业训练模型的费用，还剩下260出头，全都可以变成温暖的 Free Token 。

什么？原来GLM-5.2在你那里是一副高高在上的样子吗？哈哈，GLM酱在我这里可不是这样的哦；在我这里，GLM酱可是被站起来随便蹬还不用花钱的雌 ~~*抱歉，我暂时无法回答你的问题*~~

直到昨天，我才知道，[神所创造的世界，并非完美](https://www.bilibili.com/video/BV1gd4y1s7fs/)。

昨晚原本只是一个普通的夜晚，我兴冲冲地下载了 Cherry Studio ，刚刚配好模型供应商，每个模型简单聊上两句确认状态，一切都是那么和谐美好———— [直到我的钱包中了一箭](https://moegirl.uk/File:24153912.jpg)：

![wtf](/pics/glm/wtf.jpg)

**WTF?! 黑刀之夜啊黑刀之夜😭** 狼狈充钱1元巨款还债后，我不禁喟叹于我白嫖天堂的破碎：免费的 GLM-5.2 ，终究是要离我而去了吗？一看 API 控制台，傻眼了：

![data0](/pics/glm/data0.png)

为什么有两个 GLM-5.2 ？ `ZHIPU/GLM-5.2` （联合`kimi-k3`）花了我的钱害我深陷债务； `glm-5.2` 一分不花却也出现在了当天的账单上，一看调用也有，再一看，当天的代金券也有抵扣记录。纯良的代金券免费5.2？邪恶的扣钱5.2？我们当中出了一个叛徒！到底谁真谁假？同真同假？为什么一个扣钱一个走代金券呢？

——我不知道。我只知道我的白嫖天堂它破碎力😭😭😭

>*The fallen tokens tell a story.*  
>*The great API Key was shattered.*  
>*In our home, across the web, the Cherry Studio.*  
>*Now, Queen GLM the Free is nowhere to be found,*  
>*and in the Night of the Black Knives, Wallet the Poor was first to perish.*  
>...  
>*Arise now, ye Vibecoder.*  
>*Ye bankrupted, who yet vibe.*  
>*The call of long-lost token speaks to us all.*  
>...  
>*A Vibecoder of no renown.*  
>*Cross the web, to the Cherry Studio.*  
>*to stand before the API Key.*  
>*And become the API Lord.*

## 正传：二心搅乱大乾坤，一体难修真寂灭

>*Though the web pages be broken and uncertain, claim your place as API Lord !*

**综上，我决定对这两个模型 ID ，分别在 Anthropic 和 OpenAI 的格式下，做同样的对话试验，观测模型回复和后台费用消耗情况。**

### 1.实验设置

#### 1.1 模型配置

实验分为以下4组：

![cfg1](/pics/glm/cfg1.png)

![cfg2](/pics/glm/cfg2.png)

![cfg3&4](/pics/glm/cfg3&4.png)

| 组别 | ID | 平台 | 格式 |
|------|----|-----|------|
|1| glm-5.2 | Claude Code | Anthropic |
|2| ZHIPU/GLM-5.2 | Claude Code | Anthropic |
|3| glm-5.2 | Cherry Studio | OpenAI( Responses ) |
|4| ZHIPU/GLM-5.2 | Cherry Studio | OpenAI( Responses ) |

#### 1.2 统一对话试验设计

**统一输入如下信息，做一轮对话：**

```
请说出现在的具体时间，以及你使用的模型
```

设计该对话试验**目的：**

1. **方便获取当前时间，用于组别区分。** Claude Code 无法直观的看到对话发生时间，需要 AI 自行返回；Cherry Studio 默认配置下 AI 无法返回时间信息，但提供直观的时间信息。这样就可以在所有组别获得直观准确的时间信息，便于后续的组别区分。
2. **辨别模型。** 通过 AI 直接自述和间接通过思维链、消耗 token 数和回答方式两种方式，验证模型一致性。

#### 1.3 数据获取与处理方式

**数据获取：**

1. **调用信息：** [百炼控制台](https://bailian.console.aliyun.com/)和本地信息( Cherry Studio 和 Claude Code 提供 ) 交叉验证。
2. **用量信息：** [百炼控制台](https://bailian.console.aliyun.com/)查看是否有**直接消费**，[阿里云费用与成本控制台](https://billing-cost.console.aliyun.com/coupons/coupon/detail)查看是否有**用券抵扣**。
3. **对话信息：** 直接查看。

**查看数据时使用3种方法区分组别：**

1. **响应时间：** 不同组在不同时间进行对话。
2. **API Key 隔离：** 不同平台使用不同的 API Key ，调用信息中的数字编码不同。
3. **系统提示词区分：** Claude Code 设定系统提示词显著长于 Cherry Studio ，同时也明显长于对话长度，因此可以通过消耗 token 数进行区分。

### 2.实验结果

#### 2.1 对话试验

##### 2.1.1 组1

![conv1](/pics/glm/conv1.png)

API 响应正常。时间是 20:09 。自称是 glm-5.2 但来源是配置文件，没有提供额外信息。

##### 2.1.2 组2

![conv2](/pics/glm/conv2.png)

API 无响应。报错不存在该模型 ID 。说明 `ZHIPU/GLM-5.2` 在 Anthropic 格式下不支持。

##### 2.1.3 组3

![conv3](/pics/glm/conv3.png)

API 响应正常。时间是 20:21 。自称是GLM系列模型但没有提供具体型号，时间感知有问题 (没有给它提供当前时间) 。注意到思考了24 s 并消耗了1529 tokens，输出速率64.9 tps 。

##### 2.1.4 组4

![conv4](/pics/glm/conv4.png)

API 响应正常。时间是 20:18 。但是可以看到回复和组3有明显区别。同样自称是GLM系列模型但没有提供具体型号，时间感知有问题。思考时间9 s (明显更短) ，消耗651 tokens (明显更少)，输出速率 71.1 tps (略微更快)。

#### 2.2 各组费用消耗情况

**总体消费：**

![data2](/pics/glm/data2.png)

[百炼控制台](https://bailian.console.aliyun.com/)显示 `glm-5.2` 和 `ZHIPU/GLM-5.2` 都出现在了当天的账单中；但只有 `ZHIPU/GLM-5.2` 产生了直接消费， `glm-5.2` 消费显示为0但仍然出现在了账单上。这和之前的情况一致。

**具体调用情况和消费分析：**

进一步查看调用记录：

![data3](/pics/glm/data3.png)

三次调用记录，根据时间先后顺序和 API Key ID 交叉验证，即分别对应 组1->组4->组3 ，组2调用失败；同时再次印证了只有 `ZHIPU/GLM-5.2` 产生了直接消费， `glm-5.2` 直接消费为0。

再分单个模型看。

先看 `glm-5.2` ： 

![data4](/pics/glm/data4.png)

两次调用，第一次消耗显著多于第二次，根据系统提示词长度分析，分别对应 Claude Code 上的组1和 Cherry Studio 上的组4，再次交叉印证了之前的组别判断。同时消耗 token 数也与 Cherry Studio 显示一致。

再看 `ZHIPU/GLM-5.2` ：

![data5](/pics/glm/data5.png)

单次调用。同样印证了之前的组别判断。同时消耗 token 数也与 Cherry Studio 显示一致。

最后查看[阿里云费用与成本控制台](https://billing-cost.console.aliyun.com/coupons/coupon/detail)：

![data1](/pics/glm/data1.png)

出现两次抵扣记录。应该就是对应组1和组4的 `glm-5.2` 消费了。

#### 2.3 结论

1. **`ZHIPU/GLM-5.2` 产生费用直接消费； `glm-5.2` 产生费用不通过直接消费，而走阿里云用券抵扣。**
2. **`ZHIPU/GLM-5.2` 和 `glm-5.2` 从表现上来看，路由到的是不同的模型。`ZHIPU/GLM-5.2` 思考强度较高， `glm-5.2` 思考强度较低。** 疑似对应的是同一个模型 GLM-5.2 不同思考强度的两个状态。 
3. **`ZHIPU/GLM-5.2` 和 `glm-5.2` 均支持 OpenAI 的 Responses 格式。但 `ZHIPU/GLM-5.2` 没有 Anthropic 格式的响应。**

**最后的疑点： Anthropic 格式的 `glm-5.2` 是否和 OpenAI 格式的 `glm-5.2` 连到的是同一个模型？** 由于Anthropic 格式的 `ZHIPU/GLM-5.2` 没有响应， Anthropic 格式的 `glm-5.2` 和 OpenAI 格式的 `ZHIPU/GLM-5.2` 连到同一个模型的可能性并没有排除。有没有可能只有 OpenAI 格式的 `glm-5.2` 思考强度较弱呢？这可能需要进一步跨平台统一系统提示词做实验了，目前的实验解决不了这个问题。

## 尾声：好像干了什么，但是什么都没干捏

仔细一想，这么一通弄下来，的确解开了一些迷惑，但是又产生了一个更关键的问题 (毕竟平时用的最多的就是Anthropic 格式的 `glm-5.2` )。

结局也算出人意料：`ZHIPU/GLM-5.2` 和 `glm-5.2` 竟然真的是两个表现不同的模型。官方文档只提供了 `ZHIPU/GLM-5.2` 这一个模型 ID ，这让我在配置 Claude Code 时经受了莫大的痛苦 (怎么着都没响应呗) ；`glm-5.2` 这个 ID 也是试出来的，算是个“隐藏 ID ”？

再一想到 `ZHIPU/GLM-5.2` 产生费用直接消费； `glm-5.2` 产生费用走阿里云用券抵扣，**简直就像在玩tmd魂游：一开始来个“门不能从这一侧打开”( `ZHIPU/GLM-5.2` 不响应)，然后克服万难找到一个隐藏道路(`glm-5.2`)，发现正好绕到了门的另一侧，最后如释重负地开门(Cherry Studio 的 `ZHIPU/GLM-5.2` 响应了)，然后被门后面的三条也够扑上来咬死(我的钱啊😭)。与此同时，在阿里云百转千回的页面逻辑和不知所云的专业术语里想要找到费用产生路径，体验堪比不看攻略，纯靠游戏内文本指引全清史东薇尔城。**

**阿里也是学到了你高哥的精髓，这 token 钱我给了，下一部魂游你来做🙌🙌🙌**

>*The fallen tokens tell a story.*  
>*Of how a Vibecoder became API Lord.*  
>*In our home, across the web, the Cherry Studio.*  
>
>*Our seed will look back upon us, and **recall**.*  
>*An Age of Fracture.*  

