var t=require("child_process").execSync;function r(r){return t("cd "+r+" && git branch --show-current").toString().trim()}module.exports={isBranch:function(t,n){return r(t).includes(n)},getStatus:function(r){return t("cd "+r+" && git status").toString().trim()},getCurrentBranch:r};
//# sourceMappingURL=git.js.map
