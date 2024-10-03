const loadPhone = async (searchText) => {
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
                    <img src="${phone.image}" alt="${phone.phone_name}" />
                </figure>
            </div>
            <div class="card-body items-center text-center">
                <h2 class="card-title mt-5">${phone.phone_name}</h2>
                <p class="mt-5">
                    There are many variations of passages available, but the majority have suffered.
                </p>
                <h2 class="text-xl font-bold mt-3">
                    $999
                </h2>
                <div class="card-actions mt-4">
                    <button onclick="openModal('${phone.slug}')" class="btn bg-primary-color text-white font-bold">Show Details</button>
                </div>
            </div>
        `;
        phoneCards.appendChild(phoneCard);
    });

    toggleSpinner(false);
}

const handleSearch = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    loadPhone(searchText);
    toggleSpinner(true);
}

const toggleSpinner = (isToggle) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isToggle) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

const openModal = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    const showAllDetails = document.getElementById('my_modal_5');
    showAllDetails.innerHTML = `
        <div class="modal-box w-11/12 mx-auto p-10">
            <div class="bg-[#0D6EFD0D]">
                <figure class="text-center p-10">
                    <img src="${phone.image}" alt="${phone.name}" class="w-1/2 mx-auto" />
                </figure>
            </div>
            <h3 class="text-lg font-bold pt-10">${phone.name}</h3>
            <p class="py-4 text-[#706F6F]">
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
            </p>
            <div class="space-y-4">
                <h3 class="text-[#706F6F] font-semibold">
                    Storage: <span class="text-[#706F6F] font-normal">${phone.mainFeatures?.storage || 'No storage available in this device'}</span>
                </h3>
                <h3 class="text-[#706F6F] font-semibold">
                    Display Size: <span class="text-[#706F6F] font-normal">${phone.mainFeatures?.displaySize || 'No display size available in this device'}</span>
                </h3>
                <h3 class="text-[#706F6F] font-semibold">
                    Chipset: <span class="text-[#706F6F] font-normal">${phone.mainFeatures?.chipSet || 'No chipset available in this device'}</span>
                </h3>
                <h3 class="text-[#706F6F] font-semibold">
                    Memory: <span class="text-[#706F6F] font-normal">${phone.mainFeatures?.memory || 'No memory available in this device'}</span>
                </h3>
                <h3 class="text-[#706F6F] font-semibold">
                    Slug: <span class="text-[#706F6F] font-normal">${phone.slug}</span>
                </h3>
                <h3 class="text-[#706F6F] font-semibold">
                    Release Date: <span class="text-[#706F6F] font-normal">${phone.releaseDate || 'No release date available'}</span>
                </h3>
                <h3 class="text-[#706F6F] font-semibold">
                    Brand: <span class="text-[#706F6F] font-normal">${phone.brand || 'No brand available'}</span>
                </h3>
                <h3 class="text-[#706F6F] font-semibold">
                    GPS: <span class="text-[#706F6F] font-normal">${phone.others?.GPS || 'No GPS information available'}</span>
                </h3>
            </div>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn bg-red-500 text-white">Close</button>
                </form>
            </div>
        </div>
    `;

    my_modal_5.showModal();
}