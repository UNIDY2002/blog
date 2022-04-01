---
thumbnail: /images/random/material-19.png
author: UNIDY
title: 30分钟入门PyCharm
date: 2020-02-06
categories: 技术宅
tags:
  - PyCharm
  - Python
qrcode: false
share_menu: false
donate: false
toc: false
comments: true
hide_big_card: true
excerpt: JetBrains家产品的配置根本不用怕
---

<style>
    .scrollblock{
        position: relative;
	    margin: 0;
	    width: 100%;
        padding-top: 50px;
        padding-bottom: 50px;
        text-align: center;
    }
    .block-welcome {
        background-color: white;
        color: black;
    }
    .block-welcome h1 {
        font-size: 40px;
    }
    .block-welcome h2 {
        font-size: 27px;
    }
    .block-welcome p {
        font-size: 14px;
        margin-top: 32px;
        margin-bottom: 32px;
    }
    .block-setup{
        background-color: #348FD4;
        color: #06406C;
        font-size: 13px;
    }
    .block-setup h1 {
        font-size: 36px;
    }
    .block-setup a.simple {
        color: lightblue !important;
    }
    .block-setup a.big {
        color: white !important;
        font-size: 22px;
        font-weight: normal;
        font-style: normal;
        background-color: #06406c;
        padding: 10px 15px !important;
        margin: 8px !important;
        border-radius: 10px;
        text-decoration: none;
        line-height: 70px !important;
    }
    .block-setup a.big:hover,
    .block-setup a.big:focus {
        border-bottom: none !important;
        background-color: #003466 !important;
    }
    .block-setup a.normal {
        color: white !important;
        font-size: 15px;
        font-weight: normal;
        font-style: normal;
        background-color: #FF4081;
        padding: 8px 12px !important;
        margin: 6px !important;
        border-radius: 10px;
        text-decoration: none;
        line-height: 46px !important;
    }
    .block-setup a.normal:hover,
    .block-setup a.normal:focus {
        border-bottom: none !important;
        background-color: #ff80ab !important;
    }
    .mdui-dialog-setup {
        padding-top: 40px !important;
        padding-bottom: 40px !important;
        overflow-y: scroll;
    }
    .mdui-dialog-setup h3 {
        font-size: 28px !important;
    }
    .mdui-dialog-setup h4{
        font-size: 24px !important;
    }
    .mdui-dialog-setup p {
        font-size:15px !important;
        background-color: white !important;
        line-height: 22px !important;
    }
    .mdui-dialog-setup small {
        font-size: 12px !important;
        color: gray !important;
        line-height: 20px !important;
    }
    .block-config {
        background-color: #FFC19F !important;
        color: black !important;
    }
    .block-config h2 {
        color: #CC4037 !important;
        font-size: 25px;
    }
    .block-config h3 {
        color: #CC4037 !important;
        font-size: 20px;
    }
    .block-config code {
        background-color: #ffb584 !important;
        color: black !important;
    }
    .block-try {
        background-color: black;
        color: white;
        font-size: 16px;
        line-height: 30px !important;
    }
    .block-try h2 {
        font-size: 32px !important;
    }
    .block-try code {
        color: black !important;
        margin: 6px !important;
    }
    .block-white {
        font-size: 16px;
        line-height: 30px !important;
    }
    .block-coding {
        font-size: 15px;
        background-color: #4C0D09;
        color: #D3B2AF;
    }
    .block-coding code {
        background-color: #6d4c41 !important;
        color: black !important;
        margin: 6px;
    }
    .block-coding .gutter pre {
        color: #D3B2AF !important;
        text-align: right !important;
        /*font-family: consolas, monospace !important;*/
    }
    .block-coding .code pre {
        text-align: left !important;
        /*font-family: consolas, monospace !important;*/
    }
    .block-coding table {
        margin-left: calc(50% - 131px) !important;
    }
    code {
        /*font-family: consolas, monospace !important;*/
    }
    .block-DIY {
        font-size: 16px;
        background-color: #FFF8C9;
        color: #615400;
    }
    .block-DIY code {
        background-color: black !important;
        color: white !important;
    }
    .block-DIY a.simple {
        color: #21add4 !important;
    }
    .block-TabNine {
        background-color: #CC4037 !important;
        color: #4C0D09 !important;
        font-size: 16px !important;
    }
    .block-TabNine code {
        background-color: black !important;
        color: white !important;
    }
    .block-TabNine code.big {
        font-size: 22px !important;
        line-height: 38px !important;
    }
    .block-TabNine a {
        color: #ff501f !important;
    }
    .block-ending {
        background-color: #FFC19F;
        color: #CC4037;
    }
    .block-ending code {
        background-color: #ffb584 !important;
        color: black !important;
    }
    .block-ending p {
        font-size:18px !important;
        line-height: 28px !important;
    }
</style>

<div class="scrollblock block-welcome">
	<h1>30分钟入门PyCharm</h1>
    <h2>JetBrains家产品的配置根本不用怕</h2>
    <p>
        作者：UNIDY<br>
        设计灵感来源：<a href="https://www.runoob.com/manual/git-guide/" target="_blank">https://www.runoob.com/manual/git-guide/</a><br>
        实际入门时间可能与下载和安装速度有关<br>
        如果遇到困难，欢迎在评论区指出<br>
        帮我一起改进这份教程~<br>
        <small>尚未进行网页的移动端适配（可能这辈子也不会做了……）</small>
    </p>
    <img src="/articles/intro-to-pycharm/arrow.png" alt>
</div>
<div class="scrollblock block-setup">
    <h1>准备工作……</h1>
    <p>
        <a href="https://download.jetbrains.8686c.com/python/pycharm-community-2019.3.3.exe" target="_blank" class="big" onClick="alert('重要的事情说三遍：\n如果之前没装过Java环境，那么\n安装PyCharm时记得勾选Download and install JRE x86 by JetBrains\n安装PyCharm时记得勾选Download and install JRE x86 by JetBrains\n安装PyCharm时记得勾选Download and install JRE x86 by JetBrains\n（我在下一版块还会提醒你的。）\n（假如安装时没这个选项就不用管了）');">PyCharm <i class="fa fa-windows"></i></a>
        <a href="javascript:" mdui-dialog="{target: '#setup-Windows'}" class="big">Python <i class="fa fa-windows"></i></a><br>
        <a href="https://download.jetbrains.8686c.com/python/pycharm-community-2019.3.3.dmg" target="_blank" class="big" onClick="alert('重要的事情说三遍：\n如果之前没装过Java环境，那么\n安装PyCharm时记得勾选Download and install JRE x86 by JetBrains\n安装PyCharm时记得勾选Download and install JRE x86 by JetBrains\n安装PyCharm时记得勾选Download and install JRE x86 by JetBrains\n（我在下一版块还会提醒你的。）\n（假如安装时没这个选项就不用管了）');">PyCharm <i class="fa fa-apple"></i></a>
        <a href="javascript:" mdui-dialog="{target: '#setup-Mac'}" class="big">Python <i class="fa fa-apple"></i></a><br>
        <a href="https://download.jetbrains.8686c.com/python/pycharm-community-2019.3.3.tar.gz" target="_blank" class="big">PyCharm <i class="fa fa-linux"></i></a>
        <a href="javascript:" mdui-dialog="{target: '#setup-Linux'}" class="big">Python <i class="fa fa-linux"></i></a>
    <p>PyCharm和Python都要准备好，两者可同时下载<br>
    <a href="javascript:" class="simple" mdui-dialog="{target: '#setup'}">我是CS专业的学生</a></p>
    <div class="mdui-dialog mdui-dialog-setup" id="setup" style="display: none; top: 61px; height: 488px;">
      <h3>你可以选择使用PyCharm专业版</h3>
      <p><a href="/articles/intro-to-pycharm/features.png" target="_blank">按需选择——功能比较</a></p>
      <p>PyCharm专业版是付费产品，但对学生免费<br>
      如果你之前没有申请过JetBrains学生账号<br>
      <a href="https://www.jetbrains.com/shop/eform/students" target="_blank">点击链接申请</a></p>
      <p>
        PyCharm专业版下载链接（不含Python）<br>
        <a href="https://download.jetbrains.8686c.com/python/pycharm-professional-2019.3.3.exe" target="_blank" class="normal" onClick="alert('重要的事情说三遍：\n如果之前没装过Java环境，那么\n安装PyCharm时记得勾选Download and install JRE x86 by JetBrains\n安装PyCharm时记得勾选Download and install JRE x86 by JetBrains\n安装PyCharm时记得勾选Download and install JRE x86 by JetBrains\n（我在下一版块还会提醒你的。）\n（假如安装时没这个选项就不用管了）');"><i class="fa fa-windows"></i></a>
        <a href="https://download.jetbrains.8686c.com/python/pycharm-professional-2019.3.3.dmg" target="_blank" class="normal" onClick="alert('重要的事情说三遍：\n如果之前没装过Java环境，那么\n安装PyCharm时记得勾选Download and install JRE x86 by JetBrains\n安装PyCharm时记得勾选Download and install JRE x86 by JetBrains\n安装PyCharm时记得勾选Download and install JRE x86 by JetBrains\n（我在下一版块还会提醒你的。）\n（假如安装时没这个选项就不用管了）');"><i class="fa fa-apple"></i></a>
        <a href="https://download.jetbrains.8686c.com/python/pycharm-professional-2019.3.3.tar.gz" target="_blank" class="normal"><i class="fa fa-linux"></i></a><br>
        你也可以选择回退到教程页面，继续下载PyCharm社区版
      </p>
    </div>
    <div class="mdui-dialog mdui-dialog-setup" id="setup-Windows" style="display: none; top: 61px; height: 488px;">
       <h3>请先确认电脑上是否安装过Python</h3>
       <p>如果已经装有Python 3，就不用再安装了<br>
       如果没有印象，那多半是没装过，请继续往下看</p>
       <h4>你是Windows 10用户吗？</h4>
       <p>那太好了！打开cmd（<a href="javascript:" onClick="alert('同时按住Windows徽标键和R键\n跳出“运行”提示框\n输入cmd确定即可')">如何打开？</a>），输入命令<code>python</code><br>
       应该会跳出Microsoft Store，一键安装即可<br>
       <small>cmd上打印出了Python的版本信息……？嘿，你明明已经安装过了！<br>
       不过假如真这样，检查一下版本号，如果<code><3.5</code><br>
       那还是要手动进入Microsoft Store，或使用下面的安装包，重装一下最新版哦~</small></p>
       <h4>emm……好像并不是诶……</h4>
       <p>没关系，我帮你准备好了<a href="https://www.python.org/ftp/python/3.8.1/python-3.8.1-amd64.exe">安装包</a>，手动安装也不难~<br>
       安装时选中<code>Add Python 3.8 to PATH</code>，Install Now即可~</p>
    </div>
    <div class="mdui-dialog mdui-dialog-setup" id="setup-Mac" style="display: none; top: 61px; height: 488px;">
       <h4>别急……先打开Mac终端</h4>
       <p><code style="font-size:22px">$ python --version</code></p>
       <p><small>等一等……终端是啥……<br>
       莫慌！直接往下找到方案二，使用传统方式安装即可</small></p>
       <p>如果打印出的版本号<code>≥3.5</code><br>
       就代表你的Mac上已有版本合适的Python，不用再安装了<br>
       否则，请继续往下看</p>
       <h3>方案一：Homebrew快捷通道</h3>
       <p>如果之前没有用过Homebrew，参见<a href="https://brew.sh/" target="_blank">官网</a><br>
       找到Install Homebrew，把那串指令复制到终端中</p>
       <p>Homebrew安装好后，输入指令<br>
       <code>$ brew install python</code><br>
       如果一切顺利，那么就大功告成啦~</p>
       <h3>方案二：传统通道</h3>
       <p>感觉这波操作好复杂？<br>
       别紧张！<br>
       我帮你准备好了<a href="https://www.python.org/ftp/python/3.8.1/python-3.8.1-macosx10.9.pkg">安装包</a>，使用传统方式安装即可~</p>
    </div>
    <div class="mdui-dialog mdui-dialog-setup" id="setup-Linux" style="display: none; top: 61px; height: 488px;">
       <p>先留个坑</p>
       <p>等我实测过了再回来补</p>
    </div>
</div>
<div class="scrollblock block-config">
    <h2>初始化PyCharm</h2>
    <p>（假如有这个选项的话）别忘了安装PyCharm时要勾选<code>Download and install JRE x86 by JetBrains</code>哦~</p>
    <p>PyCharm安装完成后是配置环节<br>
    此处先按默认来，因为后面还可以改</p>
    <h3>Import Settings</h3>
    <p>选择<code>Do not import settings</code>即可</p>
    <h3>Customize PyCharm</h3>
    <p>左下角选择<code>Skip Remaining and Set Defaults</code>即可</p>
    <h3>[专业版用户] PyCharm License Activation</h3>
    <p>在<code>JetBrains Account</code>通道下<br>
    输入申请学生账号用的邮箱和相应的JetBrains密码</p>
</div>
<div class="scrollblock block-try">
    <h2>Hello, world!</h2>
    <p>在电脑中选好一个位置，以后专门放PyCharm的项目</p>
    <p>回到PyCharm<br>
    点击<code>Create New Project</code><br>
    在最上面<code>Location</code>一栏中<br>
    填入你选好的位置<br>
    并在后面加上<code>/项目名称</code><br>
    例如：<br>
    <code>D:/PyCharm-Projects/Hello-world</code><br>
    初次使用先别急着<code>Create</code>，继续往下看</p>
</div>
<div class="scrollblock block-white">
    <p>展开<code>Project Interpreter</code><br>
    选择<code>New environment using Virtualenv</code><br>
    这里的<code>Location</code>字段不用动<br>
    点开<code>Base interpreter</code>一栏的下拉列表<br>
    选择版本最新的那个<br>
    然后就可以<code>Create</code>啦~</p>
</div>
<div class="scrollblock block-coding">
    <h3>等PyCharm准备好之后</h3>
    <p>在左侧你会看到项目文件管理窗口<br>
    （虽然现在什么文件也没有）<br>
    找到主文件夹（例如<code>Hello-world</code>）<br>
    右击，<code>New->Python File</code><br>
    （不要点成别的类型的File了）<br>
    输入你想要的文件名</p>
    <p>文件打开后，将下面的代码粘贴进去</p>
    <figure class="highlight python">
        <table>
            <tr>
                <td class="gutter">
                    <pre><span class="line">1</span><br><span class="line">2</span></pre>
                </td>
                <td class="code">
                    <pre><span class="line"><span class="built_in">print</span>(<span class="string">'Hello, world!'</span>)</span><br><span class="line"></span><br></pre>
                </td>
            </tr>
        </table>
    </figure>
    <p style="font-size:18px; line-height: 28px">按下组合键：<br>
    （ <i class="fa fa-windows"></i> / <i class="fa fa-linux"></i> ）<code>Ctrl+Shift+F10</code><br>
    （ <i class="fa fa-apple"></i> ）<code>⌃⇧R</code><br>
    （或在上方菜单栏中找到<code>Run->Run</code>）<br>
    你就能在下方看到输出的<code>Hello, world!</code>啦~</p>
</div>
<div class="scrollblock block-DIY">
    <h1>DIY时间到！</h1>
    <p>以下两部分非必须<br>
    所以不计入那30分钟（23333</p>
    <p>左上角找到<br>
    <code>File->Settings->Editor->Font</code><br>
    右边第一个<code>Font</code>是英文字体，推荐Consolas<br>
    <code>Fallback font</code>是非英文字体，挑个自己喜欢的<br>
    （也都只是推荐，具体怎么调，完全由你而定）</p>
    <p>然后回到左边，找到<code>Color Scheme->Python</code><br>
    快乐的调色环节完全由你掌控！<br></p>
</div>
<div class="scrollblock block-TabNine">
    <p>调色完成后，回到左边，收起<code>Editor</code><br>
    然后进入<code>Plugins</code>，搜索<code>TabNine</code><br>
    <code>Install</code>这款超棒的智能补全插件<br>
    让它助你一臂之力吧！</p>
    <p>不过需要注意的是<br>
    TabNine的深度学习功能只有30天的试用期<br>
    好在专业版目前免费<br>
    TabNine安装完成后，<a href="https://tabnine.com/beta_signup" target="_blank">点击链接</a>申请专业版<br>
    你会收到一封含有注册码的邮件</p>
    <p>回到PyCharm<br>
    在任一打开的代码文件的任一位置直接输入<br>
    <code class="big">TabNine::config</code><br>
    （不要复制粘贴）<br>
    在跳出的页面中，找到<code>Activation key</code>一栏<br>
    粘贴入注册码即可~</p>
</div>
<div class="scrollblock block-ending">
    <h2>还想说的是……</h2>
    <p>创建、移动、复制、粘贴、重命名、删除文件<br>
    <strong>都在左侧的项目文件管理窗口中进行</strong><br>
    其中，<strong>重命名和删除在<code>Refactor</code>下找</strong><br>
    假如一不小心把那个窗口关掉了<br>
    双击File...Edit...下面一排的路径条就能召唤回来~</p>
    <h1>最后的最后，牢记这个快捷键</h1>
    <h2>（ <i class="fa fa-windows"></i> / <i class="fa fa-linux"></i> ）<code>Ctrl+Alt+L</code><br>
    （ <i class="fa fa-apple"></i> ）<code>⌘⌥L</code></h2>
    <p>它可以帮你整理代码<br>
    增强代码可读性</p>
    <p>不过，由于Python的缩进风格<br>
    <strong>建议每一行前的空格数自己调整好</strong><br>
    以防PyCharm整理代码时出现意外<br>
    （不过万一真出意外了，撤销回去就好~）</p>
</div>
<div class="scrollblock">
    <h2>如果想学习更多Python的知识</h2>
    <h3>欢迎查看我写的快速入门教程！</h3>
    <p>然而并没有这种东西……</p>
    <h3>所以……推荐另一个网站吧</h3>
    <p><a href="https://www.runoob.com/python3/python3-tutorial.html" target="_blank">https://www.runoob.com/python3/python3-tutorial.html</a></p>
    <p>也欢迎在评论区指出这份教程可以改进的地方<br>
    或者对这个页面的直男配色提出合理化建议</p>
    <p>最后，再次……</p>
    <h3>祝学习愉快~</h3>
</div>
