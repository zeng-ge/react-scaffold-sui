import { getCookie, getDomain, getUserInfo } from '../cookie'

const cookie = 'COM.CMB.LP.PAAS.APP.DOMAIN=paas.cmbuat.com; COM.CMB.LP.PAAS.APP.LPIMGPAD=http%3A%2F%2Flpimgpad.paas.cmbuat.com; COM.CMB.LP.PAAS.APP.LPCMPPHPPAD=http%3A%2F%2Flpcmpphppad.paas.cmbuat.com; COM.CMB.LP.PAAS.APP.LPHOMEPAD=http%3A%2F%2Flphomepad-dev.paas.cmbuat.com; COM.CMB.LP.PAAS.APP.LPCMPPAD=http%3A%2F%2Flpcmppad.paas.cmbuat.com; COM.CMB.LP.PAAS.APP.LPBTMPAD=http%3A%2F%2Flpbtmpad.paas.cmbuat.com; COM.CMB.LP.PAAS.APP.LPIMGPADR=http%3A%2F%2Flpimgpad-r.paas.cmbuat.com; COM.CMB.LP.PAAS.APP.LPCLTPAD=http%3A%2F%2Flpcltpad.paas.cmbuat.com; COM.CMB.LP.PAAS.APP.LPCMPFLASHPAD=http%3A%2F%2Flpcmpflashpad.paas.cmbuat.com; COM.CMB.LP.PAAS.APP.LPRISKPAD=http%3A%2F%2Flpriskpad.paas.cmbuat.com; COM.CMB.LP.PAAS.APP.LPCMPPADR=http%3A%2F%2Flpcmppad-r.paas.cmbuat.com; lp.paas.cmbuat.com.sua.roles=%5B%2201%22%2C%2202%22%2C%2203%22%2C%2204%22%2C%2205%22%2C%2206%22%5D; lp.paas.cmbuat.com.sua.userid=01029491; lp.paas.cmbuat.com.sua.username=%E9%99%88%E5%8B%87%E6%B5%8B%E8%AF%95; lp.paas.cmbuat.com.sua.sysid=lphomepad; lp.paas.cmbuat.com.sua.branchid=755; lp.paas.cmbuat.com.sua.fstbranchid=755; lp.paas.cmbuat.com.sua.branchname=%E6%B7%B1%E5%9C%B3%E5%88%86%E8%A1%8C; lp.paas.cmbuat.com.sua.subbranchid=755083; lp.paas.cmbuat.com.sua.subbranchname=%E6%B7%B1%E5%9C%B3%E5%88%86%E8%A1%8C%E5%85%AC%E5%8F%B8%E9%87%91%E8%9E%8D%E4%BA%8B%E4%B8%9A; lp.paas.cmbuat.com.sua.vorgcode=755; lp.paas.cmbuat.com.sua.vorgname=%E6%B7%B1%E5%9C%B3%E5%88%86%E8%A1%8C; lp.paas.cmbuat.com.sua.vorglvl=30; lp.paas.cmbuat.com.sua.operlvl=05; lp.paas.cmbuat.com.sua.mobile=13089787554; lp.paas.cmbuat.com.sua.userlvl=5; lp.paas.cmbuat.com.sua.type=LP; lp.paas.cmbuat.com.sua.token=0A2F1ED004E8DF4B7688078B5C27FC8C; lp.paas.cmbuat.com.sua.resources=%5B%22XWD_CUSMNG%22%2C%22PAD_IMAGE%22%2C%22PAD_PHOTO_CROP%22%2C%22XWD_MYWORK%22%5D; OUTFOX_SEARCH_USER_ID_NCOO=848973361.8135359; COM.CMB.LP.PAAS.APP.VERSION=201802230932; ___rl__test__cookies=1525249056557'

describe('cookie', () => {
  let currentCookie = cookie
  beforeAll(() => {
    Object.defineProperty(document, 'cookie', {
      get() {
        return currentCookie
      }
    })
  })

  test('getCookie by key COM.CMB.LP.PAAS.APP.DOMAIN', () => {
    expect(getCookie('COM.CMB.LP.PAAS.APP.DOMAIN')).toEqual('paas.cmbuat.com')
  })

  test('getDomain from cookie', () => {
    expect(getDomain()).toEqual('paas.cmbuat.com')
  })

  test('getUser from cookie', () => {
    currentCookie = cookie
    expect(getUserInfo()).toEqual({
      'branchID': '755',
      'branchName': '深圳分行',
      'info': {
        'BRANCH_ID': '755',
        'BRANCH_MAME': '深圳分行',
        'SUBBRANCH_ID': '755083',
        'SUBBRANCH_NAHE': '深圳分行公司金融事业',
        'USER_ID': '01029491',
        'USER_LEVEL': '5',
        'USER_NAME': '陈勇测试',
        'VORG_CODE': '755',
        'VORG_LEVEL': '30',
        'VORG_NAME': '深圳分行',
      },
      'mobile': '13089787554',
      'operationLvl': '05',
      'subBranchID': '755083',
      'subBranchName': '深圳分行公司金融事业',
      'userID': '01029491',
      'userLevel': '5',
      'userName': '陈勇测试',
      'virtualOrgCode': '755',
      'virtualOrgLevel': '30',
      'virtualOrgName': '深圳分行',
    })
  })

  test('getUser without cookie', () => {
    currentCookie = ''
    expect(getUserInfo()).toEqual({})
  })
})
