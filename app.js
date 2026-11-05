// ================= 全局购物车逻辑 =================

// 1. 从本地存储(localStorage)获取购物车数据
function getCart() {
    const cart = localStorage.getItem('myShoppingCart');
    return cart ? JSON.parse(cart) : []; // 如果有数据就转换，没有就返回空数组
}

// 2. 保存购物车数据，并更新右上角的数字角标
function saveCart(cart) {
    localStorage.setItem('myShoppingCart', JSON.stringify(cart));
    updateCartBadge();
}

// 3. 更新导航栏的红色角标数量
function updateCartBadge() {
    const cart = getCart();
    // 计算总件数 (比如 2 个苹果 + 3 个香蕉 = 5)
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.textContent = totalCount;
        badge.style.display = totalCount > 0 ? 'block' : 'none'; // 有商品才显示
    }
}

// 4. 加入购物车逻辑
function addToCart(productId, title, price, thumbnail) {
    let cart = getCart();
    
    // 查找购物车里是不是已经有这个商品了
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // 如果已经有，数量 +1
        existingItem.quantity += 1;
    } else {
        // 如果没有，把商品信息存进数组，数量默认是 1
        cart.push({
            id: productId,
            title: title,
            price: price,
            thumbnail: thumbnail,
            quantity: 1 
        });
    }
    
    saveCart(cart); // 保存数据
    alert(`${title} 已成功加入购物车！`); // 弹窗提示
}

// 5. 页面加载完成后，自动显示一次购物车数量（防止刷新页面数字消失）
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
});