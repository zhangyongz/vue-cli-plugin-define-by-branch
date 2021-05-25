### vue-cli-plugin-define-by-branch

 - 用于打包命令相同时，通过分支判断项目运行的环境。
根据 git 分支，使用 webpack.DefinePlugin 给项目注入不同的环境变量，开发环境时，并不会执行插件。

 
- 配置文件
 文件名：.branch.env.master
 文件内容：
 ```
 VUE_APP_ENV="production"
 ```
 