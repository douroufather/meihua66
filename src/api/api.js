/**
 * Created by jerry on 2017/4/13.
 */
import axios from 'axios'

let base = '/api'
//let base = ''
/*登录*/
export const requestLogin = params => { return axios.post(`${base}/userlogin`, params).then(res => res.data) }
/*获取导航*/
export const reqGetNav = params => { return axios.get(`${base}/me/menu`).then(res => res.data) }

/*员工信息管理*/
/*用户列表*/
export const getUserList = params => { return axios.get(`${base}/us/userlist`,{params}).then(res => res.data)}

export const queryUserList = params => { return axios.get(`${base}/us/queryusers`,{params}).then(res => res.data)}

export const queryUserListByGroupid = params => { return axios.get(`${base}/us/userlistbygroupid`,{params}).then(res => res.data)}

/*添加用户列表*/
export const AddUser = params => { return axios.post(`${base}/us/adduser`,params).then(res => res.data)}
/*编辑用户列表*/
export const UpdateUser = params => { return axios.post(`${base}/us/updateuser`,params).then(res => res.data)}
/*修改用户密码*/
export const updatePassword = params => { return axios.post(`${base}/us/updatepassword`,params).then(res => res.data)}
/*校验用户密码*/
export const checkPassword = params => { return axios.post(`${base}/us/checkpassword`,params).then(res => res.data)}
/*删除单个用户*/
export const DeleteUser = params => { return axios.post(`${base}/us/deleteuser`,params).then(res => res.data)}
/*批量删除用户*/
export const DeleteUserList = params => { return axios.post(`${base}/us/deleteuserlist`,params).then(res => res.data)}

/*获取部门树*/
export const getDeptTree = params => { return axios.get(`${base}/depttree`,{params}).then(res => res.data)}
/*根据用户权限查询组织树*/
export const groupTreeById = params => { return axios.get(`${base}/grouptreebyid`).then(res => res.data)}


/*获取集团树列表*/
export const getGroupTree = params => { return axios.get(`${base}/grouptree`,{params}).then(res => res.data)}

/*获取map树列表*/
export const getMapTree = params => { return axios.get(`${base}/querymaptree`,{params}).then(res => res.data)}

export const regionTree = params => { return axios.get(`${base}/regiontree`,{params}).then(res => res.data)}


/*公司信息管理*/

/*公司信息列表*/
export const getCompanyList = params => { return axios.get(`${base}/code/companylist`,{params}).then(res => res.data)}
/*添加保存*/
export const AddCompanyList = params => { return axios.post(`${base}/code/addcompany`,params).then(res => res.data)}
/*编辑*/
export const UpdateCompany = params => { return axios.post(`${base}/code/updatecompany`,params).then(res => res.data)}
/*公司树*/
export const getCompanyTree= params => { return axios.get(`${base}/companytree`).then(res => res.data)}

export const QueryCompany = params => { return axios.get(`${base}/code/querycompany`,{params}).then(res => res.data)}

/*获取省市县*/
export const getQueryregion = params => { return axios.get(`${base}/re/queryregion`,{params}).then(res => res.data)}

/*获取区域树*/
export const getRegionTree = params => { return axios.get(`${base}/regiontree`,{params}).then(res => res.data)}

/*获取区域屏蔽列表*/
export const getShieldRegion = params => { return axios.get(`${base}/re/shieldlist`,{params}).then(res => res.data)}

/*获取区域屏蔽列表*/
export const addShieldRegion = params => { return axios.post(`${base}/re/addshieldregion`,params).then(res => res.data)}





/*获取子级省市县*/
export const getChildrenRegion = params => { return axios.get(`${base}/re/childrenregion`,{params}).then(res => res.data)}

/*获取父省市县*/
export const getParentRegion = params => { return axios.get(`${base}/re/parentregion`,{params}).then(res => res.data)}
/*删除*/
export const reqDeleteCompany = params => { return axios.post(`${base}/code/deletecompany`, params).then(res => res.data) }
/*批量删除*/
export const deleteCompanylist = params => { return axios.post(`${base}/code/deletecompanylist`, params).then(res => res.data) }


/*部门信息管理*/
/*部门列表*/
export const getDeptlist = params => { return axios.get(`${base}/code/deptlist`,{params}).then(res => res.data)}

/*添加部门保存*/
export const AddDept = params => { return axios.post(`${base}/code/adddept`,params).then(res => res.data)}
/*编辑部门*/
export const Updatedept = params => { return axios.post(`${base}/code/updatedept`,params).then(res => res.data)}
/*删除部门*/
export const reqDeleteDept = params => { return axios.post(`${base}/code/deletedept`, params).then(res => res.data) }
/*批量删除*/
export const deleteDeptlist = params => { return axios.post(`${base}/code/deletedeptlist`, params).then(res => res.data) }


/*区域信息管理*/
export const getRegionList = params => { return axios.get(`${base}/re/regionlist`,{params}).then(res => res.data)}


/*角色信息管理*/
/*角色信息列表*/
export const getRoleList = params => { return axios.get(`${base}/ro/rolelist`,{params}).then(res => res.data)}
/*新增角色*/
export const addRole = params => { return axios.post(`${base}/ro/addrole`,params).then(res => res.data)}
/*编辑角色*/
export const updateRole = params => { return axios.post(`${base}/ro/updaterole`,params).then(res => res.data)}
/*删除角色*/
export const deleteRole = params => { return axios.post(`${base}/ro/deleterole`,params).then(res => res.data)}
/*权限列表*/
export const rightList = params => { return axios.get(`${base}/ro/rightlist`,{params}).then(res => res.data)}
/*新增权限*/
export const addRight = params => { return axios.post(`${base}/ro/addright`,params).then(res => res.data)}



/*添加保存*/
export const Addregion = params => { return axios.post(`${base}/re/addregion`,params).then(res => res.data)}
/*编辑保存*/
export const UpdateRegion = params => { return axios.post(`${base}/re/updateRegion`,params).then(res => res.data)}
/*删除区域*/
export const Deleteregion = params => { return axios.post(`${base}/re/deleteregion`, params).then(res => res.data) }
/*批量删除区域*/
export const Deleteregionlist = params => { return axios.post(`${base}/re/deleteregionlist`, params).then(res => res.data) }

/*系统管理*/
/*菜单管理*/
/*菜单管理列表*/
export const getMenuList = params => { return axios.get(`${base}/me/menulist`,{params}).then(res => res.data)}
/*添加菜单*/
export const AddMenu= params => { return axios.post(`${base}/me/addmenu`,params).then(res => res.data)}
/*编辑保存菜单*/
export const UpDateMenu= params => { return axios.post(`${base}/me/updatemenu`,params).then(res => res.data)}
/*删除菜单*/
export const DeleteMenu= params => { return axios.post(`${base}/me/deletemenu`,params).then(res => res.data)}

/*字典管理*/
/*字典管理列表*/
export const getDictList = params => { return axios.get(`${base}/di/dictlist`,{params}).then(res => res.data)}
/*添加字典*/
export const Adddict= params => { return axios.post(`${base}/di/adddict`,params).then(res => res.data)}
/*编辑字典列表*/
export const Updatedict= params => { return axios.post(`${base}/di/updatedict`,params).then(res => res.data)}
/*删除字典*/
export const Deletedict= params => { return axios.post(`${base}/di/deletedict`,params).then(res => res.data)}
/*查询类型*/
export const FindType= params => { return axios.get(`${base}/di/findType`,{params}).then(res => res.data)}


/*logo上传*/
export const UpLoad= params => { return axios.post(`${base}/logo/upload`,params).then(res => res.data)}

//钥匙管理
//钥匙列表
export const getKeyList = params => { return axios.get(`${base}/ke/keylist`,{params}).then(res => res.data)}

export const queryKeyList = params => { return axios.get(`${base}/ke/querykeylist`,{params}).then(res => res.data)}

export const AddKey = params => { return axios.post(`${base}/ke/addkey`,params).then(res => res.data)}
export const UpdateKey = params => { return axios.post(`${base}/ke/updatekey`,params).then(res => res.data)}
export const DeleteKey = params => { return axios.post(`${base}/ke/deletekey`,params).then(res => res.data)}
export const DeleteKeyList = params => { return axios.post(`${base}/ke/deletekeylist`,params).then(res => res.data)}


/*锁具管理*/
/*锁具信息列表*/
export const getLockList = params => { return axios.get(`${base}/lo/locklist`,{params}).then(res => res.data)}
/*锁具添加信息*/
export const Addlock = params => { return axios.post(`${base}/lo/addlock`,params).then(res => res.data)}
/*锁具编辑信息*/
export const Updatelock = params => { return axios.post(`${base}/lo/updatelock`,params).then(res => res.data)}
/*锁具删除信息*/
export const Deletelock = params => { return axios.post(`${base}/lo/deletelock`,params).then(res => res.data)}
/*删除锁具列表信息*/
export const Deletelocklist = params => { return axios.post(`${base}/lo/deletelocklist`,params).then(res => res.data)}
/*锁具选择*/
export const queryLockList = params => { return axios.get(`${base}/lo/querylocklist`,{params}).then(res => res.data)}



/*线路信息列表*/
export const getRouteList = params => { return axios.get(`${base}/ro/routelist`,{params}).then(res => res.data)}
/*添加线路信息*/
export const AddRoute = params => { return axios.post(`${base}/ro/addroute`,params).then(res => res.data)}
/*锁具线路信息*/
export const UpdateRoute = params => { return axios.post(`${base}/ro/updateroute`,params).then(res => res.data)}
/*删除线路信息*/
export const DeleteRoute = params => { return axios.post(`${base}/ro/deleteroute`,params).then(res => res.data)}
/*删除线路列表信息*/
export const DeleteRouteList = params => { return axios.post(`${base}/ro/deleteroutelist`,params).then(res => res.data)}
/*锁具上级线路*/
export const QueryRouteList = params => { return axios.get(`${base}/ro/queryroutelist`,{params}).then(res => res.data)}



/*日志查看*/
/*系统日志列表*/
export const sysLogList = params => { return axios.get(`${base}/sl/sysloglist`,{params}).then(res => res.data)}

/*设备日志列表*/
export const DeviceLogList = params => { return axios.get(`${base}/de/deviceloglist`,{params}).then(res => res.data)}


/*任务管理*/
/*任务列表*/
export const getAuthList = params => { return axios.get(`${base}/au/authlist`,{params}).then(res => res.data)}
/*添加任务*/
export const addAuth = params => { return axios.post(`${base}/au/addauth`,params).then(res => res.data)}
/*编辑任务*/
export const updateAuth = params => { return axios.post(`${base}/au/updateauth`,params).then(res => res.data)}
/*删除任务*/
export const deleteAuth = params => { return axios.post(`${base}/au/deleteauth`,params).then(res => res.data)}
/*删除任务列表*/
export const deleteAuthList = params => { return axios.post(`${base}/au/deleteauthlist`,params).then(res => res.data)}
/*线路树*/
export const routeTree = params => { return axios.get(`${base}/routetree`,{params}).then(res => res.data)}

/*导出*/
/*导出员工列表*/
export const exportUserList = params => { return axios.get(`${base}/export/exportuser`,{params}).then(res => res.data)}
/*导出钥匙信息列表*/
export const exportKey= params => { return axios.get(`${base}/export/exportkey`,{params}).then(res => res.data)}
/*导出锁信息列表*/
export const exportLock= params => { return axios.get(`${base}/export/exportlock`,{params}).then(res => res.data)}
/*导出线路息列表*/
export const exportRoute= params => { return axios.get(`${base}/export/exportroute`,{params}).then(res => res.data)}
/*导出任务列表*/
export const exportAuth= params => { return axios.get(`${base}/export/exportauth`,{params}).then(res => res.data)}
/*导出设备日志列表*/
export const exportDevicelog= params => { return axios.get(`${base}/export/exportdevicelog`,{params}).then(res => res.data)}
/*导出系统日志列表*/
export const exportSyslog= params => { return axios.get(`${base}/export/exportsyslog`,{params}).then(res => res.data)}



