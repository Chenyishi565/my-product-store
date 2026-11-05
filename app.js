// ================= 全局购物车逻辑 =================

// 1. 从本地存储(localStorage)获取购物车数据
function getCart() {
    const cart = localStorage.getItem('myShoppingCart');
    return cart ? JSON.parse(cart) : []; 
}

// 2. 保存购物车数据，并更新右上角的数字角标
function saveCart(cart) {
    localStorage.setItem('myShoppingCart', JSON.stringify(cart));
    updateCartBadge();
}

// 3. 更新导航栏的红色角标数量
function updateCartBadge() {
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.textContent = totalCount;
        badge.style.display = totalCount > 0 ? 'block' : 'none'; 
    }
}

// 4. 加入购物车逻辑
function addToCart(productId, title, price, thumbnail) {
    let cart = getCart();
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            title: title,
            price: price,
            thumbnail: thumbnail,
            quantity: 1 
        });
    }
    
    saveCart(cart); 
    alert(`${title} has been added to your cart!`); // 已替换为英文弹窗
}

// 5. 页面加载完成后，自动显示一次购物车数量
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
});
