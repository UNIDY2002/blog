---
thumbnail: /images/random/material-9.png
title: THUInfo踩坑记录（一）
qrcode: true
share_menu: false
donate: false
date: 2020-2-13
categories: 代码控
tags:
  - Android
  - Kotlin
toc: true
comments: true
excerpt: 轻松处理应用内页面导航
---

去年年底，我开始着手写[THUInfo](https://github.com/UNIDY2002/THUInfo)。经过一个多月的磕磕绊绊，我也总算是做出了一点东西——虽然我也知道，这距离一个成熟的APP还有很长一段距离，更何况我也只做出了Android版本。

眼瞅着就要进入常规的学习状态了，各门课的老师未见其人，已见其任务，THUInfo的开发可以暂缓一段时间了。回顾这一个多月，编程水平不见得有多少提升，**奇怪的知识倒是增加了不少**。我觉得自己有必要将一些内容记录下来，即使没人看，也算是帮助自己温故而知新吧。~~（实则突然找到可以写成博客的素材了）~~

---

**我毕竟刚刚接触Android，很多认识也都停留在表面，没有太多接触源码的东西，因此我现阶段写下的内容，只管能用就行。**

第一部分，我打算写点当前少有教程提到的内容：页面导航（`Navigation`），以及可配套食用的顶部工具栏（`Toolbar`）、底部导航栏（`BottomNavigationView`）和侧边抽屉（`DrawerLayout`）。

# 引入

`Navigation`能做什么？

**我们经常需要处理页面之间的切换。**以`THUInfo`为例，主页、动态、计划之间的切换就是基本操作。幸而，Google于2018年推出`Android Jetpack`，其中的`Navigation`模块可以帮助开发者**使用少量代码轻松地实现这一需求**。

**此外，我们的需求往往不止于三四个根页面之间的切换。**例如，在主页页面之下，我们还要有教室资源、消费查询等子页面。**并且，我们还希望，在这些子页面中，返回键能够得到正确的处理（即回到上级页面），屏幕左上角也要相应地设置一个虚拟的返回按钮。**而这些需求，借助`Navigation`，均可轻松得到实现。

那么，`Navigation`到底是怎么一回事呢？`Navigation`最基本的思路就是，**设定一个容器`fragment`**（注：新版`Navigation`推荐使用`FragmentContainerView`，不过我还没研究），**将其标记为宿主（`NavHostFragment`），由`NavController`进行管理。实际运用时如要切换页面，只需替换掉该`fragment`填充的内容即可。**此外，`NavController`切换页面时，会自动维护返回栈，从而可进一步实现返回键的处理。

从设计理念上讲，通过`Navigation`可以将不同的页面借助`fragment`进行关联，而无需创建更多的`activity`——这也符合了“一个APP只用一个`activity`”的理念。

---

# 快速入门

## 懒人模式

在`New Project`中选择`Bottom Navigation Activity`作为模板就可以了。

不过，看例程有可能看得云里雾里的，而且如果想把它迁移到已有项目中也要费一番周折，**所以下面我来对其中的关键步骤进行分解，谈谈如何具体操作。**

## 自己动手

### 准备工作

#### 添加Gradle依赖

```groovy
dependencies {
    ...
    // For Java
    implementation 'androidx.navigation:navigation-fragment:2.2.1'
    implementation 'androidx.navigation:navigation-ui:2.2.1'

    // For Kotlin
    implementation 'androidx.navigation:navigation-fragment-ktx:2.2.1'
    implementation 'androidx.navigation:navigation-ui-ktx:2.2.1'
    ...
}
```

---

#### 创建第一个页面

IDE为我们提供了图形化操作界面，可以帮助我们轻松创建一个页面。

在`res`下新建`navigation`目录，右击，新建一个`Navigation Resource File`（`root`为`navigation`），然后你应该会看见类似这样的代码：

```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
            xmlns:app="http://schemas.android.com/apk/res-auto"
            android:id="@+id/mobile_navigation">

</navigation>
```

接着，进入`Design`或`Split`视图，你应该能看见`Click [icon] to add a destination`。点击它所指示的图标，你会看见`Create new destination`。点击，IDE会弹出`New Android Component`对话框。

在`Fragment Name`一栏中，填好相应的名称，例如`HomeFragment`。假如命名合理规范，下面的`Fragment Layout Name`一栏也会相应地变化，例如变成`fragment_home`。接下来，`Create layout XML?`勾上，`Include fragment factory methods?`不用勾，这样后续可以省很多事。

创建完成后，这一个导航文件的内容也会发生一些变化。你可以对它进行一些调整，例如`android:label`表示该`fragment`显示给用户的名称，可以根据需要改成其它值。

除此之外，你应该能在`res/layout`目录下发现多了一个`.xml`布局文件，你可以稍后对它进行修改。

而在代码部分，你应该会发现，多出了一个继承自`Fragment`的自定义类（可能是`HomeFragment`）。这个类将会负责管理你所创建的这个页面的生命周期。比如，你会重载`onStart`方法，从而设定这个页面启动时的行为。

---

#### 设置导航菜单

在`res`下新建`menu`目录，在`menu`目录下创建一个`bottom_nav_menu.xml`（文件名随意，这里加`bottom`为了与之后的侧边抽屉区分）。里面的内容大概长这样：

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item
            android:id="@+id/homeFragment"
            android:icon="@drawable/ic_home_black_24dp"
            android:title="@string/title_home"/>
    ...
</menu>
```

我觉得已经非常直白了，就不再赘述了。

**不过有一点，貌似这儿的`id`要和你在`navigation`文件中对应页面的`id`保持一致。**

---

#### 去掉默认标题栏

Google为Android应用提供了默认的标题栏，但实践表明，预设的标题栏太丑了，且难以定制。因此，我们先要将其去掉，以便后面设置更加灵活的`Toolbar`。

方法很简单，找到`res/values/styles.xml`，将`AppTheme`的`parent`改成`Theme.AppCompat.Light.NoActionBar`即可。

接着，为设置`Toolbar`稍作准备，设置一下`Toolbar`的主题样式：

```xml
<resources>
    ...
    <style name="ToolbarTheme">
        <item name="colorControlNormal">@android:color/white</item>
        <item name="android:textColorPrimary">@android:color/white</item>
        <item name="android:background">@color/colorPrimary</item>
    </style>
    ...
</resources>
```

其中，`colorControlNormal`和`android:textColorPrimary`分别是工具栏按钮和标题文字的颜色，至于是`white`还是`black`取决于背景色。

---

#### 添加宿主容器

我们一般会选择一个“模板页面”，腾出一块地方安排宿主容器。例如，在`THUInfo`中，我就将宿主容器放到了主页面`activity_main.xml`中（注意不是“主页”，“主页”“动态”“计划”是平行的三个模块）。

你的布局文件大概会像这样：

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent">

    <androidx.appcompat.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            app:layout_constraintTop_toTopOf="parent"
            android:theme="@style/ToolbarTheme"/>

    <fragment
            android:id="@+id/nav_host_fragment"
            android:name="androidx.navigation.fragment.NavHostFragment"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_marginTop="@dimen/activity_vertical_margin"
            app:defaultNavHost="true"
            app:layout_constraintTop_toBottomOf="@id/toolbar"
            app:layout_constraintBottom_toTopOf="@id/bottom_nav_view"
            app:navGraph="@navigation/mobile_navigation"/>

    <com.google.android.material.bottomnavigation.BottomNavigationView
            android:id="@+id/bottom_nav_view"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:background="?android:attr/windowBackground"
            app:layout_constraintBottom_toBottomOf="parent"
            app:menu="@menu/bottom_nav_menu"/>
</androidx.constraintlayout.widget.ConstraintLayout>
```

稍微提几点。

- 第16行，`fragment`的`id`，会在之后指定`NavController`时用到。
- 第17行，作用在于将该`fragment`标记为宿主。
- 第19行，Google的例程有点问题，在`ConstraintLayout`下会自动填满整个屏幕。我把它改成了`0dp`，这样可以指定它竖直方向填充的上下限。
- 第21行，将其设定为`defaultNavHost`，这样`NavController`在处理返回键时，就能知道，是在对这一个`NavHost`进行操作。
- 第24行，指定该宿主执行相应`navGraph`中页面的切换。
- 第32行，将`menu`设置为刚刚设好的导航菜单。

至此，准备工作已经就绪，下面就可以看代码了。

---

### 代码

```kotlin
class MainActivity : AppCompatActivity() {

    private lateinit var appBarConfiguration: AppBarConfiguration
    private lateinit var navController: NavController
    private lateinit var toolbar: Toolbar

    private val topLevelDestinationIds = setOf(R.id.homeFragment, R.id.newsFragment, R.id.scheduleFragment)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)

        navController = findNavController(R.id.nav_host_fragment)
        appBarConfiguration = AppBarConfiguration(topLevelDestinationIds)
        setupActionBarWithNavController(navController, appBarConfiguration)
        findViewById<BottomNavigationView>(R.id.bottom_nav_view).setupWithNavController(navController)
    }
}
```

~~（有机会整一个`Kotlin`的语法高亮……IDE里面五彩斑斓的，搬到网页上就全是黑的了……）~~

- 第7行，将它们作为`top level destinations`拎出来，既能突出其特殊地位，也方便`NavController`进行处理。
- 第13、14行，设置`Toolbar`。
- 第16行，获取`NavController`。**关于`findNavController`有一个注意点，后面再说。**
- 第17、18行，将`NavController`与标题栏（这里是`toolbar`）进行绑定。
- 第19行，将`NavController`与底部导航栏进行绑定。

现在，假如一切顺利的话，程序应该就能跑起来了。

---

# 导航

讲到这里，我们已经可以在若干个`top level destination`之间进行切换了。**不过，要在不同层级的页面之间进行切换，又该如何操作呢？**

这就需要用到`NavController`的`navigate`方法了。

**`navigate`方法的签名如下：**

```java
public void navigate(int resId)
```

它的一个作用是，提供一个目标的`resId`，从而让该`NavController`实例切换至这个目标。

这里有两个问题：目标的`resId`如何提供，以及`NavController`实例如何找到。

---

## 目标的`resId`如何提供？

具体手法上与[#创建第一个页面](#创建第一个页面)的操作类似，`resId`就是你所创建的对应页面的`id`，在此不再细讲。

## `NavController`实例如何找到？

在上面的示例代码中，我使用了`findNavController`方法来获取`NavController`实例。但仔细观察后，我们发现，这里的`findNavController`是`Activity`类的一个拓展方法。**那么，当我们已经在某一个`fragment`中时，又该如何获取到`NavController`实例呢？**

这时，我们看到，`NavHostFragment`下也有一个`findNavController`方法。它的签名如下：

```java
public static NavController findNavController(Fragment fragment)
```

具体而言，提供一个`fragment`，它会沿着这个`fragment`的`parent chain`，一直找到其对应的`NavController`。因此，在实际应用中，代码一般长这样：

```kotlin
wentu_btn.setOnClickListener {
    NavHostFragment.findNavController(this).navigate(R.id.wentuFragment)
}
```

这里的`this`指代的是代码所处的`HomeFragment`类。

当然，方法不止这一种。我们同样可以用`Fragment`的`getActivity`方法，先获取到对应的`Activity`，再调用`Activity`的`findNavController`方法。不过这样就需要在`fragment`中用到宿主`fragment`的`id`，我个人认为这样写不利于降低模块间的耦合度。

---

## 处理虚拟返回键

有了`NavController`，我们发现，物理的返回键已经能够得到正确的处理，即返回上级页面。**然而，屏幕左上角的虚拟返回键却丝毫没有响应。这是为什么呢？**

其实，这也不是什么怪事。`NavController`的文档中已经指出：

> You are responsible for calling `NavController.navigateUp` to handle the Navigation button.
> Typically this is done in `AppCompatActivity.onSupportNavigateUp`.

因此，我们需要自己重写`onSupportNavigateUp`方法。于是，我们回到`MainActivity`中，加上这样一行代码：

```kotlin
override fun onSupportNavigateUp() = navController.navigateUp(appBarConfiguration)
```

简简单单的一句话，就能顺利解决问题。我想，这背后的魔力，就在于`NavController`的各种优秀的方法（例如这里的`navigateUp`）。

---

# 侧边抽屉

这里，同样也有懒人模式……在`New Project`中找到`Navigation Drawer Activity`就好了。

不过，鉴于我们需要将抽屉直接引入当前的项目，我们最好还是手动进行整合。

---

## 调整布局

我们先来回顾一下`THUInfo`的抽屉。

![THUInfo抽屉布局](https://unidy2002.github.io/articles/thui-a-1/drawer.png)

有两个部分。上面是一个渐变色背景的`headerLayout`，下面是`menu`。

---

### `headerLayout`

如何画出一个渐变色的背景，并不是我们的重点。可以直接看Google的例程，也可以直接看`THUI`的源代码（[前景](https://github.com/UNIDY2002/THUInfo/blob/master/app/src/main/res/layout/nav_header_main.xml)、[背景](https://github.com/UNIDY2002/THUInfo/blob/master/app/src/main/res/drawable/side_nav_bar.xml)）。

### `menu`

与[#设置导航菜单](#设置导航菜单)中的操作类似，不过要创建一个新的`menu`文件，比如说`side_nav_menu.xml`。而且还更简单，因为这里不需要设置`icon`了。

---

### 修改布局文件

这里，我们就要对`activity_main.xml`大动干戈了。

其实改动也不大，主要是在外面套一层`DrawerLayout`，再添加一个`NavigationView`。

改完之后大概长这样：

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.drawerlayout.widget.DrawerLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:id="@+id/drawer_layout"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:openDrawer="start">

    <androidx.constraintlayout.widget.ConstraintLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent">
        <!-- Identical code omitted -->
    </androidx.constraintlayout.widget.ConstraintLayout>

    <com.google.android.material.navigation.NavigationView
            android:id="@+id/side_nav_view"
            android:layout_width="wrap_content"
            android:layout_height="match_parent"
            android:layout_gravity="start"
            app:headerLayout="@layout/nav_header_main"
            app:menu="@menu/side_nav_menu"/>

</androidx.drawerlayout.widget.DrawerLayout>
```

基本上还是比较直白的，没有多少可说的。有一点，就是Google的例程上有两处`android:fitsSystemWindows="true"`。有没有这句话的区别，这里主要体现在，程序进行绘制时是否算进系统顶部的透明状态栏。

---

## 修改源代码

下面，就是修改源代码了。主要有两处要改。

第一处，是将`appBarConfiguration = AppBarConfiguration(topLevelDestinationIds)`改成`appBarConfiguration = AppBarConfiguration(topLevelDestinationIds, findViewById(R.id.drawer_layout))`，从而将这一`DrawerLayout`绑定进去。

第二处，是要处理抽屉里的选项的点击指令。这里，我通过重写`onCreateOptionsMenu`方法来实现。（这一块我也没弄清楚为什么要在这里重载。）

具体而言：

```kotlin
override fun onCreateOptionsMenu(menu: Menu): Boolean {
    side_nav_view.setNavigationItemSelectedListener {
        when (it.itemId) {
            // Do something
        }
        true
    }
    return true
}
```

在`// Do something`的部分对点击的选项进行处理。其中，`itemId`为刚刚添加的`menu`的项目对应的`id`。

---

到此为止，运行程序，我们已经可以通过`Navigation`实现页面之间的切换，并能够配合`Toolbar`、`BottomNavigationView`和`DrawerLayout`一起食用。最后，我想关于定制`Toolbar`做一点补充。

# 定制`Toolbar`

在实际应用中，我们有时会希望`Toolbar`的标题文字和按钮图标能够动态地改变。这又该如何实现呢？

---

## 动态设置标题文字

以`THUInfo`为例，在查询教室资源时，当用户进入了具体的教学楼页面（例如“六教”），标题栏也相应地变成了“六教”。[代码](https://github.com/UNIDY2002/THUInfo/blob/master/app/src/main/java/com/unidy2002/thuinfo/ui/home/ClassroomTableFragment.kt)其实很简单：

```kotlin
(activity as? AppCompatActivity)?.supportActionBar?.title = "{Your Title}"
```

此处，先获得`fragment`所在的`activity`，并将其转化为`AppCompatActivity`，因为`getSupportActionBar`是`AppCompatActivity`的方法。得到了`supportActionBar`后，获取到`title`，我们就可以动态地进行设置了。

---

## 动态设置按钮图标

在`THUInfo`中，当收到新邮件时，左上角的按钮图标会变成带小红点的三道杠。这又是如何实现的呢？

首先，我们当然是要先准备好新图标。**这里比较重要的是，图标的大小要调整好，比如设置成24dp*24dp，因为`Toolbar`貌似不会对图标进行自动缩放。**

代码跟上面差不多，得到`supportActionBar`之后，设置`navigationIcon`属性，即可实现。

当然，这有点暴力修改的意味在里面。因此，要想显得不那么暴力，需要考虑一些问题。最主要的，就是设置`navigationIcon`的过程是一瞬间完成的，中间的过渡动画就没有了。

还有两个小问题。

1. 每30秒重新获取一次未读邮件情况，相应地也要刷新一下左上角的图标。然而，**我忘了还要判断当前页面是否为`top level destiniation`**，导致的结果是，明明左上角应该是一个返回键，突然就变成带小红点的三道杠了。
   看一下修改之后的代码片段：

   ```kotlin
   if (navController.currentDestination?.id in topLevelDestinationIds) {
       // Update badge
   }
   ```

2. 然而，仅仅每30秒刷新一次显然不够——当用户重新来到`top level destination`时，也应刷新一次。这时，我们就要监听`NavController`的目标变化了：

   ```kotlin
   navController.addOnDestinationChangedListener { _, destination, _ ->
       if (destination.id in topLevelDestinationIds) refreshBadge()
   }
   ```

~~（所以，为什么不自己做一个`Toolbar`呢）~~

`THUInfo`中处理小红点的[详细代码](https://github.com/UNIDY2002/THUInfo/blob/master/app/src/main/java/com/unidy2002/thuinfo/MainActivity.kt)在`MainActivity.kt`中。

---

好了，感觉自己也写了不少了，也算是把整个`Navigation`的来龙去脉都简单地梳理了一遍。

既然……我也不太会写结束语，那就，先这样结束吧~