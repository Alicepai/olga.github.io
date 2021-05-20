const logoutBtn = document.querySelector('#logout')
const productList  = document.querySelector("tbody");
const productNum = document.getElementById("product_num");

const url = 'https://vue3-course-api.hexschool.io/'; 
const path = 'dessert-alicia'; 

const app = {
    data: {
          products: []
      },
      getData(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)aliciaToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        axios.get(`${url}api/${path}/admin/products`)
        .then(res=>{
           console.log(res) 
            if(res.data.success){
  
                this.data.products = res.data.products;
                this.renderPage(this.data.products)
            }
        })
      },
      removeProduct(e){
        const id =  e.target.dataset.id;
        axios.delete(`${url}api/${path}/admin/product/${id}`)
        .then(res=>{
            swal("刪除成功",`` ,"success");
            app.getData()});
        },
        renderPage(data){
            let str = '';
            let count = 0
            for(let [key,value] of Object.entries(data)){
                count++;
                str += `
                <tr>
                <td>${value.title}</td>
                <td>${value.origin_price}</td>
                <td>${value.price}</td>
                <td>${value.is_enabled? '啟用':'未啟用'}</td>
                <td>
                    <button type="button" class="btn btn-danger del" data-id=${value.id} data-action="remove">刪除</button>
                </td>
            </tr>
            `
            }
            productList.innerHTML = str;
            productNum.innerHTML = count;

            const delBtns = document.querySelectorAll(".del");
            delBtns.forEach(btn=>{
                btn.addEventListener('click',app.removeProduct)
            })
        },
        Logout(){
            delete axios.defaults.headers.common["Authorization"];
            axios.post(`${url}logout`)
            .then(res=>{
                console.log(res)
                swal("登出成功",`三秒後返回登入頁面` ,"success");
                setTimeout(()=>{
                    window.location.href="./index.html"
                },3000)
            })
        }
      }
      app.getData();
      productList.addEventListener('click',app.judgeAction)
      logoutBtn.addEventListener('click',app.Logout);




