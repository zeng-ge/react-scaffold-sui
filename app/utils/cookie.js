export function getCookie(key) {
  let match = document.cookie.match(new RegExp(key + '=([^;]+)'))
  if (match) return decodeURI(match[1])
}

export function getDomain() {
  const rootDomain = location.hostname.substr(location.hostname.indexOf('.') + 1)
  return getCookie('COM.CMB.LP.PAAS.APP.DOMAIN') || rootDomain
}

export function getUserInfo(domain = getDomain()) {
  const currentUser = {
    userID: getCookie(`lp.${domain}.sua.userid`),
    userName: getCookie(`lp.${domain}.sua.username`),
    mobile: getCookie(`lp.${domain}.sua.mobile`),
    branchID: getCookie(`lp.${domain}.sua.branchid`),
    branchName: getCookie(`lp.${domain}.sua.branchname`),
    subBranchID: getCookie(`lp.${domain}.sua.subbranchid`),
    subBranchName: getCookie(`lp.${domain}.sua.subbranchname`),
    virtualOrgCode: getCookie(`lp.${domain}.sua.vorgcode`),
    virtualOrgName: getCookie(`lp.${domain}.sua.vorgname`),
    virtualOrgLevel: getCookie(`lp.${domain}.sua.vorglvl`),
    operationLvl: getCookie(`lp.${domain}.sua.operlvl`),
    userLevel: getCookie(`lp.${domain}.sua.userlvl`),
  }

  currentUser.info = {
    BRANCH_ID: currentUser.branchID,
    BRANCH_MAME: currentUser.branchName,
    SUBBRANCH_ID: currentUser.subBranchID,
    SUBBRANCH_NAHE: currentUser.subBranchName,
    USER_ID: currentUser.userID,
    USER_LEVEL: currentUser.userLevel,
    USER_NAME: currentUser.userName,
    VORG_CODE: currentUser.virtualOrgCode,
    VORG_LEVEL: currentUser.virtualOrgLevel,
    VORG_NAME: currentUser.virtualOrgName,
  }

  // 如果没有拿到cookie值，则返回空对象，结合lodash的isEmpty方法，可表示未登录。除了userID，也可用其他字段做判断。
  if (currentUser.userID === undefined) {
    return {}
  }

  return currentUser
}
