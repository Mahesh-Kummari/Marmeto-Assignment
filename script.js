let menEl = document.getElementById("Men");
let womenEl = document.getElementById("Women");
let kidsEl = document.getElementById("Kids");
let rootEl = document.getElementById("root");
let mainDivEl = document.getElementById("main");

const menIconEl = document.getElementById('menIcon');
const womenIconEl = document.getElementById('womenIcon');
const kidsIconEl = document.getElementById('kidsIcon');

let productDetails;
let allCategories;
let presentCategory = "Men";
let count = 0;

// initial men category button active status 
menEl.classList.add("active");
womenEl.classList.add("non-active");
kidsEl.classList.add("non-active");

// addding and removing icons 
menIconEl.classList.add('icon')
womenIconEl.classList.remove('icon')
kidsIconEl.classList.remove('icon')

menIconEl.classList.remove('no-icon')
womenIconEl.classList.add('no-icon')
kidsIconEl.classList.add('no-icon')

menEl.addEventListener("click", function(){
    presentCategory = "Men";
    productDetails = '';
    mainDivEl.innerHTML = "";

    // addding and removing icons 
    menIconEl.classList.add('icon')
    womenIconEl.classList.remove('icon')
    kidsIconEl.classList.remove('icon')

    menIconEl.classList.remove('no-icon')
    womenIconEl.classList.add('no-icon')
    kidsIconEl.classList.add('no-icon')


    menEl.classList.add("active");
    womenEl.classList.add("non-active");
    kidsEl.classList.add("non-active");

    menEl.classList.remove("non-active")
    womenEl.classList.remove("active")
    kidsEl.classList.remove("active")

});
womenEl.addEventListener("click", function(){
    presentCategory = "Women";
    productDetails = '';    
    mainDivEl.innerHTML = "";

    // addding and removing icons 
    menIconEl.classList.remove('icon')
    womenIconEl.classList.add('icon')
    kidsIconEl.classList.remove('icon')

    menIconEl.classList.add('no-icon')
    womenIconEl.classList.remove('no-icon')
    kidsIconEl.classList.add('no-icon')

    womenEl.classList.add("active");
    menEl.classList.add("non-active");
    kidsEl.classList.add("non-active");

    womenEl.classList.remove('non-active')
    menEl.classList.remove('actve')
    kidsEl.classList.remove('active')

    
});
kidsEl.addEventListener("click", function(){
    presentCategory = "Kids";
    productDetails = '';
    mainDivEl.innerHTML = "";

    // addding and removing icons 
    menIconEl.classList.remove('icon')
    womenIconEl.classList.remove('icon')
    kidsIconEl.classList.add('icon')

    menIconEl.classList.add('no-icon')
    womenIconEl.classList.add('no-icon')
    kidsIconEl.classList.remove('no-icon')

    kidsEl.classList.add("active");
    menEl.classList.add("non-active");
    womenEl.classList.add("non-active");

    kidsEl.classList.remove('non-active')
    menEl.classList.remove('active')
    womenEl.classList.remove('active')


});


// https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json
// API call 

async function getCategoryDetails() {
    
    const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    
    if (!response.ok){
        throw error(error);
        console.error();
    }else{
        const categories = await response.json();
        return categories
    }
}

function changeCategory(){
    // console.log(productDetails)
    productDetails = '';



    getCategoryDetails().then(categories => {
        categories;
        // console.log(categories.categories)
        const diffCategories = categories.categories;
        // console.log(diffCategories[0])
        allCategories = diffCategories;

        for (let cate of diffCategories){
            if (cate.category_name === presentCategory){
                let products = cate.category_products ;
                productDetails = products;
                // console.log(productDetails);

                // creating and appending products to root div 
                addProductDetails()
            }
        }
    })
};

function addProductDetails(){
    
    

    for (let i=0; i < productDetails.length; i++){
        // console.log(productDetails[i])
        let item = productDetails[i]

        // product div 
        let productEl = document.createElement('div');
        productEl.classList.add("product")
        
        // image div 
        let imgEl = document.createElement('img');
        imgEl.src = item.image;
        imgEl.classList.add('image')
        productEl.appendChild(imgEl)

        if (item.badge_text !== null){
            // badge para
            let badgeEl = document.createElement('p');
            badgeEl.classList.add('badge');
            badgeEl.innerText = item.badge_text;
            productEl.appendChild(badgeEl)
        }
        

        // title-company div 
        let titleDivEl = document.createElement('div');
        titleDivEl.classList.add("title-company");

        // title 
        let titleEl = document.createElement('h3');
        titleEl.classList.add("title");
        titleEl.textContent = item.title;
        titleDivEl.appendChild(titleEl)

        // vendor
        let vendorEl = document.createElement('li');
        vendorEl.classList.add("vendor");
        vendorEl.textContent = item.vendor;
        titleDivEl.appendChild(vendorEl)

        productEl.appendChild(titleDivEl)

        // total price div 
        let priceDivEl = document.createElement('div');
        priceDivEl.classList.add("price");
        
        // current price para
        let currentPriceEl = document.createElement('p');
        currentPriceEl.classList.add('current-price');
        currentPriceEl.innerText = "Rs " + item.price  + ".00";
        priceDivEl.appendChild(currentPriceEl)
        
        // mrp para
        let mrpEl = document.createElement('p');
        mrpEl.classList.add('mrp');
        mrpEl.innerText = item.compare_at_price + ".00";
        priceDivEl.appendChild(mrpEl)

        // calculate discount percentage
        let discountPercent = Math.round( ( (Number(item.compare_at_price)) - Number(item.price) )  / Number(item.compare_at_price) * 100)

        // discount para
        let discountEl = document.createElement('p');
        discountEl.classList.add('discount');
        discountEl.innerText = String(discountPercent)+'%';

        let offText = document.createTextNode(" Off");
        let spanEl= document.createElement('span');
        spanEl.appendChild(offText)
        spanEl.classList.add("off-style")
        discountEl.appendChild(spanEl)
        priceDivEl.appendChild(discountEl)

        productEl.appendChild(priceDivEl)

        // button
        let btnEl = document.createElement('button');
        btnEl.classList.add('button');
        btnEl.textContent = "Add to Cart";
        productEl.appendChild(btnEl)


        // priceDivEl.appendChild(productEl)
        mainDivEl.appendChild(productEl)
    
    }
    

}
// initially calling fun to get products 
changeCategory()