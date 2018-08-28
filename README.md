# My music Library

### 中间件拉取数据
* 目标：确保中间件有处理一类问题的能力
* 思路：如果action参数有undefined，那么就拦截下，等待拿到缺失的数据再发送。
* 实现： 给可以未来会拥有缺少参数的值的action做一个标记，在我中间件中把带这种标记的action拦截下来，给他一个回调函数，再发下去，等他fetch到数据以后，执行回调，我中间件拿到数据。把拿到的数据进行填充，然后next出去
* 缺陷： 目前这个版本只能处理一个缺失的类型，去过两个不同的参数都没有，那么会出问题。

### 组件化进程

* tabs组件化（通用组件）：

    Tabs：闭合标签的组件，可以指定默认展示项（defaultActiveKey），每个tabs的内含div就是一个子页。

    子页div参数：（title, icon, activeIcon, key）
    
    回调函数： callback ,打印当前显示tabs下标

* checkBox组件化（通用组件）：

    checkBox：闭合标签组件，可以指定默认选中项（defaultActiveKey），每个选项是闭合标签内的一个div

    选项div参数：(name)定义选项的文字提示。

    回调函数：onChange函数，打印选中项的key

* checkList组件化（复用组件）

    参数：要展示的数据源、选中列表、是否多选

    回调函数：返回被点击列表项的下标；

    因为内部有部分处理逻辑依赖传进来的选中列表，所以不是通用型组件

* maskAlert组件化（复用组件）

    参数：提示类型（type）、提示内容（myLIst）、主操作回调（mainOption）、辅操作回调（option）

    可以根据类型的不同，给出不同的提示框及内容，但是框架基本相同

* cutTool组件化（复用组件）

    参数：歌曲信息的列表（myList）、类型（type），
    因为此组建在播放时进行了复用，所以徐亚用type进行判断。

    传递actions下去，会在组件内部发起action

* player组件化（复用组件）

    cutTool的子组件，提供播放进度条，暂停、播放按钮，
    时间显示

## 截取工具

本质都是在操作时间，拖动进度条，拖动的过程中先把音乐暂停，只是在通过拖动改变当前的显示状态，时间没有被改变，只有当拖动完成时，才会讲拖动的距离换算回时间，然后再改变audio的时间、state中存储的currentTime。

    关于开始标记和结束标记
* 判断一首音乐是否有结束标记来确定该音乐是否被截取（存在bmt为0，emt不为0的数据）
* componentDidMount:

    如果数据的bmt不为0，认定为有标记，组件state的cutStart为bmt；

    如果数据的emt为0，认定没有标记，组件state的cutStart为也为0

* 阻止事件冒泡，使得点击改变进度条和拖拽改变进度条互不干扰
    e.stopPropagation();



## 疑问
* 更新state之前发起一个action更改store，此时的页面会刷新几次，顺序是如何的
* componentWillReceiveProps()、nextProps
* 数据问题，拉取的数据同一键有不同的值类型，数字、字符串


## 工作流：

立项：需求提出（可行性分析）ITO

需求分析： 执行和提出进行需求确认

计划： 拆解前后端及各部分工作

执行： coding

check： ！！！！

     达到一个里程碑进行立即check，team中按天为单位check，个人因该会以更小的单位进行check；
     > 闭环思维

> 以始为终，目标导向
