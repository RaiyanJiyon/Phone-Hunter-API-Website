const loadPhone = async (searchText) => {
    // const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones, searchText);
}

const displayPhone = (phones, searchText) => {
    const phoneCards = document.getElementById('phone-cards');

    phoneCards.textContent = '';

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList.add('card', 'border', 'border-[#CFCFCF]');
        phoneCard.innerHTML = `
                            <div class="bg-[#0D6EFD0D] w-11/12 mx-auto mt-5">
                        <figure class="p-10">
                            <img src="${phone.image}" />
                        </figure>

                    </div>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title mt-5">${phone.phone_name}</h2>
                        <p class="mt-5">
                            There are many variations of passages of available, but the majority have suffered
                        </p>
                        <h2 class="text-xl font-bold mt-3">
                            $999
                        </h2>
                        <div class="card-actions mt-4">
                            <button class="btn bg-primary-color text-white font-bold">Show Details</button>
                        </div>
                    </div>
        `

        phoneCards.appendChild(phoneCard);
    });

    toggleSpinner(false);

}

const handleSearch = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;

    loadPhone(searchText)
    toggleSpinner(true)
}

const toggleSpinner = (isToggle) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isToggle) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

// loadPhone();