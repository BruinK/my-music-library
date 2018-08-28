# My music Library

### 中间件拉取数据

### 组件化进程

* tabs组件化：

    Tabs参数

    子div参数（title, icon, activeIcon, key）
    
    回调 callback ,打印tabs下标

* checkBox组件化

* checkList组件化
    state更新的不及时，this.props传递的参数是上一次props的参数。 》 使用componentWillReceiveProps( nextProps )解决

## 工作过程：
    单选
* cutTool等底部工具需要两个参数触发（当前点击的toolID，操作对象的id）
* > 可优化  cutTool组件内部，接收1？2个参数（操作对象本身，所属列表）


## 截取工具

本质都是在操作时间，拖动进度条，拖动的过程中先把音乐暂停，只是在通过拖动改变当前的显示状态，时间没有被改变，只有当拖动完成时，才会讲拖动的距离换算回时间，然后再改变audio的时间、state中存储的currentTime。

    关于开始标记和结束标记
* 判断一首音乐是否有结束标记来确定该音乐是否被截取（存在bmt为0，emt不为0的数据）
* componentDidMount:

    如果数据的emt不为0，认定为有标记，组件state的cutStart为0；

    如果数据的emt为0，认定没有标记，组件state的cutStart为也为0

* 阻止事件冒泡，使得点击改变进度条和拖拽改变进度条互不干扰
    e.stopPropagation();



## 疑问
* 更新state之前发起一个action更改store，


## 工作流：

立项：需求提出（可行性分析）ITO

需求分析： 执行和提出进行需求确认

计划： 拆解前后端及各部分工作

执行： coding

check： ！！！！

     达到一个里程碑进行立即check，team中按天为单位check，个人因该会以更小的单位进行check；
     > 闭环思维

> 以始为终，目标导向
