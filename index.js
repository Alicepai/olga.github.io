const emailInput = document.querySelector("#email");
const pwdInput = document.querySelector("#pwd");
const loginBtn = document.querySelector("#loginbtn");

const url = 'https://vue3-course-api.hexschool.io/'; 
const path = 'dessert-alicia'; 

function Login(){
    //1.check ifboth input are not empty
    if(emailInput.value == '' || pwdInput.value == ''){
            swal({
        title: "帳號、密碼不得為空",
        text: "",
        });
        return;
    }
    const username = emailInput.value;
    const password = pwdInput.value;
    let user = {
        username,
        password
    }
    axios.post(`${url}admin/signin`,user)
    .then(res=>{
        console.log(res);
        if(res.data.message == '登入成功'){
            swal("登入成功", "3秒後跳轉產品頁","success")
            setTimeout(()=>{
                window.location.href=  './productList.html';
            },3000)
        }else{
            swal("登入失敗",`${res.data.error.message}` ,"error")
        }
        const token = res.data.token;
        const expired = res.data.expired;
        console.log(token, expired);
        //儲存 Token
        document.cookie = `aliciaToken=${token}; expires =${new Date(expired)} `;

    })
}


loginBtn.addEventListener('click',Login);
