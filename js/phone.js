// Function to load phone data from the API
const loadPhone = async (searchText = 'iPhone', isShowAll) => {
    // Fetch phone data based on search text
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data; // Extract phone data
    displayPhone(phones, searchText, isShowAll); // Display the phones
}

// Function to display phone cards on the page
const displayPhone = (phones, searchText, isShowAll) => {
    const phoneCards = document.getElementById('phone-cards'); // Phone card container
    const noSearchMessage = document.getElementById('no-search-message'); // No search message element
    const showAllContainer = document.getElementById('show-all-container'); // Show All button container

    phoneCards.textContent = ''; // Clear previous phone cards

    // Show "No Search Result" message if no phones are found
    if (phones.length === 0) {
        noSearchMessage.classList.remove('hidden'); // Display the no search message
        showAllContainer.classList.add('hidden'); // Hide "Show All" button
        toggleSpinner(false); // Stop the loading spinner
        return;
    }

    noSearchMessage.classList.add('hidden'); // Hide the no search message

    // If there are more than 12 phones and "Show All" is not clicked, show only 12
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden'); // Show "Show All" button
        phones = phones.slice(0, 12); // Display only the first 12 phones
    } else {
        showAllContainer.classList.add('hidden'); // Hide "Show All" button if not needed
    }

    // Create and display phone cards
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
                <h2 class="text-xl font-bold mt-3">$999</h2>
                <div class="card-actions mt-4">
                    <button onclick="openModal('${phone.slug}')" class="btn bg-primary-color text-white font-bold">Show Details</button>
                </div>
            </div>
        `;
        phoneCards.appendChild(phoneCard); // Append the card to the container
    });

    toggleSpinner(false); // Stop the loading spinner
}

// Function to handle search
const handleSearch = (isShowAll) => {
    toggleSpinner(true); // Start loading spinner
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value || 'iPhone'; // Get search input or default to 'iPhone'
    loadPhone(searchText, isShowAll); // Load phone data based on search
}

// Function to toggle the loading spinner
const toggleSpinner = (isToggle) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isToggle) {
        loadingSpinner.classList.remove('hidden'); // Show spinner
    } else {
        loadingSpinner.classList.add('hidden'); // Hide spinner
    }
}

// Function to open a modal with phone details
const openModal = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data; // Extract phone details
    showPhoneDetails(phone); // Show phone details in a modal
}

// Function to display phone details in a modal
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

    my_modal_5.showModal(); // Show modal with phone details
}

// Function to handle "Show All" button click
const showAll = () => {
    handleSearch(true); // Trigger search to show all phones
}

// Initial load of phones with default search text
loadPhone();