var RowComponent = {
  template: '<tr>\n' +
  '          <td></td>\n' +
  '          <td></td>\n' +
  '          <td></td>\n' +
  '          <td></td>\n' +
  '          <td>\n' +
  '            <button type="button" class="btn btn-info btn-sm">View</button>\n' +
  '            <button type="button" class="btn btn-primary btn-sm">Update</button>\n' +
  '            <button type="button" class="btn btn-danger btn-sm">Delete</button>\n' +
  '          </td>\n' +
  '        </tr>'
};
var app = new Vue({
  el: '#app',
  data:{
    alertMessage: '请输入用户名',
    hiddenUserNameAlert: true,
    isShowLoginSection: true,
    userName4Login:'',
    password4Login:'',
    isRemember: false,
    userName4Register: '',
    validCode: '',
    password4Register: '',
    confirmPassword: '',
    colleges:[
      {
        'code': '01',
        'name': '渭南师范学院'
      },
      {
        'code': '02',
        'name': '西安工业大学'
      },
      {
        'code': '03',
        'name': '西安理工大学'
      },
      {
        'code': '04',
        'name': '西安邮电学院'
      }
    ],
    selectedCollege: '',
    hobbies:[
      {
        'code': '01',
        'text': '跑步'
      },
      {
        'code': '02',
        'text': '电影'
      },
      {
        'code': '03',
        'text': '看书'
      },
      {
        'code': '04',
        'text': '音乐'
      }
    ],
    checkedHobbies:[]
  },
  components:{
    'tr-component': RowComponent
  },
  methods:{
    onLogin: function () {
      if(!this.checkLoginData()){
        return false;
      }
      this.login();
    },
    onRegister: function () {
      if(!this.checkRegisterData()){
        return false;
      }
      this.register();
    },
    onShowLoginSection: function () {
      this.isShowLoginSection = true;
    },
    onShowRegisterSection: function () {
      this.isShowLoginSection = false;
    },
    checkLoginData: function () {
      if(this.userName4Login.length === 0){
        alert('Please input your user name.');
        return false;
      }
      if(this.password4Login.length === 0){
        alert('Please input your password.');
        return false;
      }
      return true;
    },
    checkRegisterData: function () {
      if(this.userName4Register.length === 0){
        alert('Please input user name');
        return false;
      }
      if(this.validCode.length === 0){
        alert('Please input the valid code.');
        return false;
      }
      if(this.password4Register.length === 0){
        alert('Please input password.');
        return false;
      }
      if(this.confirmPassword.length === 0){
        alert('Please input confirm password.');
        return false;
      }
      if(this.validCode !== '123456'){
        alert('The valid code is invalid.');
        return false;
      }
      if(this.password4Register !== this.confirmPassword){
        alert('The confirm password not equal password.');
        return false;
      }
      return true;
    },
    login: function () {
      if(this.userName4Login === 'zhangqiang' && this.password4Login === '123456'){
        alert('login success.');
      }else{
        alert('login failed.');
      }
    },
    register: function () {
      alert('register success.');
    }
  }
});