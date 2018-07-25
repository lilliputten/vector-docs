
`sprity` installing error  (in WinXP)

```log
if not defined npm_config_node_gyp (node "C:\nodejs\node_modules\npm\bin\node-gyp-bin\\..\..\node_modules\node-gyp\bin\node-gyp.js" rebuild )  else (node "" rebuild )
MSBUILD : error MSB3428: Could not load the Visual C++ component "VCBuild.exe". To fix this, 1) ins tall the .NET Framework 2.0 SDK, 2) install Microsoft Visual Studio 2005 or 3) add the location of
the component to the system path if it is installed elsewhere.  [D:\Work\Vektor\WEB_TINTS\source\li bs-dev\icon-sprites\node_modules\sprity\node_modules\lwip\build\binding.sln]
MSBUILD : error MSB3428: Could not load the Visual C++ component "VCBuild.exe". To fix this, 1) ins tall the .NET Framework 2.0 SDK, 2) install Microsoft Visual Studio 2005 or 3) add the location of
the component to the system path if it is installed elsewhere.  [D:\Work\Vektor\WEB_TINTS\source\li bs-dev\icon-sprites\node_modules\sprity\node_modules\lwip\build\binding.sln]
MSBUILD : error MSB3428: Could not load the Visual C++ component "VCBuild.exe". To fix this, 1) ins tall the .NET Framework 2.0 SDK, 2) install Microsoft Visual Studio 2005 or 3) add the location of
the component to the system path if it is installed elsewhere.  [D:\Work\Vektor\WEB_TINTS\source\li bs-dev\icon-sprites\node_modules\sprity\node_modules\lwip\build\binding.sln]
gyp ERR! build error
gyp ERR! stack Error: `C:\WINDOWS\Microsoft.NET\Framework\v4.0.30319\msbuild.exe` failed with exit code: 1
gyp ERR! stack     at ChildProcess.onExit (C:\nodejs\node_modules\npm\node_modules\node-gyp\lib\build.js:276:23)
gyp ERR! stack     at emitTwo (events.js:100:13)
gyp ERR! stack     at ChildProcess.emit (events.js:185:7)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:204:12)
gyp ERR! System Windows_NT 5.1.2600
gyp ERR! command "C:\\nodejs\\node.exe" "C:\\nodejs\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js" "rebuild"
gyp ERR! cwd D:\Work\Vektor\WEB_TINTS\source\libs-dev\icon-sprites\node_modules\sprity\node_modules\lwip
gyp ERR! node -v v5.12.0
gyp ERR! node-gyp -v v3.3.1
gyp ERR! not ok
npm WARN install:lwip@0.0.9 lwip@0.0.9 install: `node-gyp rebuild`
npm WARN install:lwip@0.0.9 Exit status 1
```