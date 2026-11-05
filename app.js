// 获取 HTML 中的元素
const productContainer = document.getElementById('product-container');
const loadingElement = document.getElementById('loading');

// 定义 API URL
const API_URL = 'https://dummyjson.com/products';

// 定义一个函数来获取数据
async function fetchProducts() {
    try {
        // 发起 GET 请求获取数据 (这就是老师白板上强调的 GET)
        const response = await fetch(API_URL);
        
        // 将返回的数据转换为 JSON 格式
        const data = await response.json();
        
        // 隐藏加载提示
        loadingElement.style.display = 'none';
        
        // 获取产品数组
        const products = data.products;
        
        // 遍历产品，为每个产品创建一个卡片
        products.forEach(product => {
            // 创建一个新的 div 元素作为卡片
            const card = document.createElement('div');
            card.className = 'product-card';
            
            // 填入产品的信息 (图片、标题、价格)
            // 注意：dummyjson 返回的图片字段叫 thumbnail，标题叫 title，价格叫 price
            card.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p class="price">$${product.price}</p>
            `;
            
            // 将卡片添加到页面容器中
            productContainer.appendChild(card);
        });

    } catch (error) {
        // 如果请求失败，显示错误信息
        loadingElement.textContent = '抱歉，产品信息加载失败，请稍后再试。';
        console.error('Error fetching data:', error);
    }
}

// 页面加载后立即执行这个函数
fetchProducts();