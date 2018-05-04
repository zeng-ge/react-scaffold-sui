# 随贷通
### 目录结构
- core
  - router.js     汇聚feature的route
  - saga.js       汇聚feature的saga.js  
    ```
    saga内部函数的命名方式
    监听函数，如调用takeEvery, takeLatest, take等的函数，以Watcher作为后缀，如
    工作函数，监听函数触发的执行实际操作的函数, 以Worker作为后缀
    如eventTrackingWatcher与eventTrackingWorker
    
    core/saga.js只接收Watch作为后缀的saga
    ```
  - store.js      定义redux的store，添加middleware
- features
  - 按feature组织页面
  - containers    容器
  - components    该feature下的公共组件
  - actions.js    用redux-actions来得到这种格式的action{ type: 'TYPE', payload: { user: {} }}
  - reducer.js    定义actionHandlers来更新reducer
  - sagas.js      所有需要从server取数据的方法都用saga来定义
  - routes.js     定义该feature下页面的路由
  - index.js      将reducer、saga、route汇聚起来，交由core/register处理
- components
  - 整个项目的公共组件
- constants
  - 定义常量
- services
  - 提供服务，如http用来处理发送请求
- utils
  - 工具方法


### unit test

  测试用例放在__test__目录下，与目标js同级
  针对Component与Container的测试分为两种：
  - snapshot测试
    ```
    根据props与context生成测试快照
    缺点：仅能验证代码代码是否改变，及部分代码分支是否能覆盖到
    ```
  - enzyme测试
    ```
    可以验证render后的组件内部元素是否满嘴条件，如特定元素是否render出来
    如render生成的component为<div><a>login</a></div>
    用expect(component.find('a').text()).toBe('login')来验证该元素是否满足

    更重要的是它可以模似事件的触发，可以测试组件内部回调函数的调用
    ```
    enzyme针对Container的测试，目前分了两种
    - Container将组件与connect的结果分开export
    ```
    写法参考app/containers/Entry的测试
    相当于将Container分为两部分，纯Component与connect的容器
    可以单独对Component写测试，也可以针对connect写测试
    ```
    - 直接export connect的结果
    ```
    写法参考app/containers/FakeLogin
    相对于上面，它不能针对Component单独写测试
    ```

