    const authPage = document.getElementById("authPage");
    const signupContainer = document.getElementById("signupContainer");
    const loginContainer = document.getElementById("loginContainer");
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const travelMainPage = document.getElementById("travelMainPage");
    const travelEntriesPage = document.getElementById("travelEntriesPage");
    const profilePage = document.getElementById("profilePage");
    const goToLoginBtn = document.getElementById("showLoginBtn");
    const goToSignupBtn = document.getElementById("showSignupBtn");
    const logoutBtnMain = document.getElementById("logoutBtnMain");
    const logoutBtnEntries = document.getElementById("logoutBtnEntries");
    const logoutBtnProfile = document.getElementById("logoutBtnProfile");
    const entriesList = document.getElementById("entriesList");
    const travelForm = document.getElementById("travelForm");
    const imageInput = document.getElementById("image");
    const imagePreviewContainer = document.getElementById("imagePreviewContainer");
    const darkModeToggleMain = document.getElementById("darkModeToggleMain");
    const darkModeToggleEntries = document.getElementById("darkModeToggleEntries");
    const darkModeToggleProfile = document.getElementById("darkModeToggleProfile");
    const forgotPasswordContainer = document.getElementById("forgotPasswordContainer");
    const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
    const forgotPasswordMessage = document.getElementById("forgotPasswordMessage");
    const profileFirstname = document.getElementById("profileFirstname");
    const profileEmail = document.getElementById("profileEmail");
    const saveProfileBtn = document.getElementById("saveProfileBtn");
    const togglePublicProfileBtn = document.getElementById("togglePublicProfileBtn");
    const publicProfileStatus = document.getElementById("publicProfileStatus");
    const showEntriesBtn = document.getElementById("showEntriesBtn");
    const backToMainBtn = document.getElementById("backToMainBtn");
    const backToMainFromProfileBtn = document.getElementById("backToMainFromProfileBtn");
    const goToProfileBtn = document.getElementById("goToProfileBtn");
    const searchInput = document.getElementById("searchInput");

    // Mobile menu elements for main page
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileDarkModeToggle = document.getElementById("mobileDarkModeToggle");
    const mobileShowEntriesBtn = document.getElementById("mobileShowEntriesBtn");
    const mobileGoToProfileBtn = document.getElementById("mobileGoToProfileBtn");
    const mobileLogoutBtnMain = document.getElementById("mobileLogoutBtnMain");

    // Mobile menu elements for entries page
    const mobileMenuBtnEntries = document.getElementById("mobileMenuBtnEntries");
    const mobileMenuEntries = document.getElementById("mobileMenuEntries");
    const mobileDarkModeToggleEntries = document.getElementById("mobileDarkModeToggleEntries");
    const mobileBackToMainBtn = document.getElementById("mobileBackToMainBtn");
    const mobileLogoutBtnEntries = document.getElementById("mobileLogoutBtnEntries");
    const mobileSearchInput = document.getElementById("mobileSearchInput");

    // Mobile menu elements for profile page
    const mobileMenuBtnProfile = document.getElementById("mobileMenuBtnProfile");
    const mobileMenuProfile = document.getElementById("mobileMenuProfile");
    const mobileDarkModeToggleProfile = document.getElementById("mobileDarkModeToggleProfile");
    const mobileBackToMainFromProfileBtn = document.getElementById("mobileBackToMainFromProfileBtn");
    const mobileLogoutBtnProfile = document.getElementById("mobileLogoutBtnProfile");

    // Edit modal elements
    const editEntryModal = document.getElementById("editEntryModal");
    const closeEditModalBtn = document.getElementById("closeEditModalBtn");
    const editEntryForm = document.getElementById("editEntryForm");
    const editLocation = document.getElementById("editLocation");
    const editDate = document.getElementById("editDate");
    const editNotes = document.getElementById("editNotes");
    const editImages = document.getElementById("editImages");
    const existingImagesContainer = document.getElementById("existingImagesContainer");
    const cancelEditBtn = document.getElementById("cancelEditBtn");

    // Signup form error elements
    const errorFirstname = document.getElementById("errorFirstname");
    const errorEmail = document.getElementById("errorEmail");
    const errorPassword = document.getElementById("errorPassword");
    const errorConfirmPassword = document.getElementById("errorConfirmPassword");

    let currentUserEmail = null;
    let darkMode = false;
    let allEntriesCache = [];
    let editingEntryIndex = null;

    // Generate unique ID for entries
    function generateUniqueId() {
      return 'entry-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
    }

    // Show signup form and hide others
    function showSignup() {
      authPage.classList.remove("hidden");
      signupContainer.classList.remove("hidden");
      loginContainer.classList.add("hidden");
      travelMainPage.classList.add("hidden");
      travelEntriesPage.classList.add("hidden");
      profilePage.classList.add("hidden");
      clearImagePreview();
      removeDarkMode();
      forgotPasswordContainer.classList.add("hidden");
      forgotPasswordMessage.classList.add("hidden");
      currentUserEmail = null;
      clearSignupErrors();
    }

    // Show login form and hide others
    function showLogin() {
      authPage.classList.remove("hidden");
      signupContainer.classList.add("hidden");
      loginContainer.classList.remove("hidden");
      travelMainPage.classList.add("hidden");
      travelEntriesPage.classList.add("hidden");
      profilePage.classList.add("hidden");
      clearImagePreview();
      removeDarkMode();
      forgotPasswordContainer.classList.add("hidden");
      forgotPasswordMessage.classList.add("hidden");
      currentUserEmail = null;
      clearSignupErrors();
    }

    // Show auth page and hide others
    function showAuthPage() {
      authPage.classList.remove("hidden");
      loginContainer.classList.add("hidden");
      signupContainer.classList.remove("hidden");
      travelMainPage.classList.add("hidden");
      travelEntriesPage.classList.add("hidden");
      profilePage.classList.add("hidden");
      clearImagePreview();
      removeDarkMode();
      forgotPasswordContainer.classList.add("hidden");
      forgotPasswordMessage.classList.add("hidden");
      currentUserEmail = null;
      clearSignupErrors();
    }

    // Show main travel page (add entry)
    function showTravelMainPage() {
      authPage.classList.add("hidden");
      travelMainPage.classList.remove("hidden");
      travelEntriesPage.classList.add("hidden");
      profilePage.classList.add("hidden");
      applyDarkMode();
      renderEntries();
      closeAllMobileMenus();
    }

    // Show travel entries page (list)
    function showTravelEntriesPage() {
      authPage.classList.add("hidden");
      travelMainPage.classList.add("hidden");
      travelEntriesPage.classList.remove("hidden");
      profilePage.classList.add("hidden");
      applyDarkMode();
      renderEntries();
      searchInput.value = "";
      if(mobileSearchInput) mobileSearchInput.value = "";
      closeAllMobileMenus();
    }

    // Show profile page
    function showProfilePage() {
      authPage.classList.add("hidden");
      travelMainPage.classList.add("hidden");
      travelEntriesPage.classList.add("hidden");
      profilePage.classList.remove("hidden");
      applyDarkMode();
      loadUserProfile();
      closeAllMobileMenus();
    }

    // Save user data to localStorage
    function saveUser(user) {
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      users[user.email] = user;
      localStorage.setItem("users", JSON.stringify(users));
    }

    // Get user data from localStorage by email
    function getUser(email) {
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      return users[email] || null;
    }

    // Save travel entries for user
    function saveEntries(email, entries) {
      localStorage.setItem(`entries_${email}`, JSON.stringify(entries));
    }

    // Load travel entries for user
    function loadEntries(email) {
      return JSON.parse(localStorage.getItem(`entries_${email}`) || "[]");
    }

    // Save public profile status for user (boolean)
    function savePublicProfile(email, isPublic) {
      localStorage.setItem(`public_profile_${email}`, JSON.stringify(isPublic));
    }

    // Load public profile status for user
    function loadPublicProfile(email) {
      return JSON.parse(localStorage.getItem(`public_profile_${email}`) || "false");
    }

    // Fetch weather data from Open-Meteo API (free, no key required)
    async function fetchWeather(lat, lon) {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        const response = await fetch(url);
        if (!response.ok) return null;
        const data = await response.json();
        return data.current_weather;
      } catch {
        return null;
      }
    }

    // Geocode location to lat/lon using OpenStreetMap Nominatim API
    async function geocodeLocation(location) {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`;
        const response = await fetch(url, { headers: { "User-Agent": "TravelDiaryApp/1.0" } });
        if (!response.ok) return null;
        const data = await response.json();
        if (data.length === 0) return null;
        return { lat: data[0].lat, lon: data[0].lon };
      } catch {
        return null;
      }
    }

    // Render travel entries list with unique IDs for cards and buttons
    async function renderEntries(filter = "") {
      entriesList.innerHTML = "";
      if (!currentUserEmail) return;
      let travelEntries = loadEntries(currentUserEmail);

      // Cache all entries for search filtering
      allEntriesCache = travelEntries;

      if (filter.trim() !== "") {
        const filterLower = filter.toLowerCase();
        travelEntries = travelEntries.filter(entry => entry.location.toLowerCase().includes(filterLower));
      }

      travelEntries.sort((a, b) => new Date(b.date) - new Date(a.date));

      if (travelEntries.length === 0) {
        entriesList.innerHTML =
          '<li class="text-indigo-700 dark:text-indigo-400 italic select-none">No travel entries found.</li>';
        return;
      }

      for (let index = 0; index < travelEntries.length; index++) {
        const entry = travelEntries[index];

        // Ensure each entry has a unique id, generate if missing
        if (!entry.id) {
          entry.id = generateUniqueId();
        }

        const li = document.createElement("li");
        li.id = `card-${entry.id}`;
        li.className =
          "bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md border border-indigo-200 dark:border-gray-600 select-text";

        const headerDiv = document.createElement("div");
        headerDiv.className = "flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1";

        const h3 = document.createElement("h3");
        h3.className = "text-xl font-semibold text-indigo-900 dark:text-indigo-300";
        h3.textContent = entry.location;

        const dateSpan = document.createElement("span");
        dateSpan.className = "text-indigo-700 dark:text-indigo-400 text-sm";
        dateSpan.textContent = entry.date;

        headerDiv.appendChild(h3);
        headerDiv.appendChild(dateSpan);

        const notesP = document.createElement("p");
        notesP.className = "text-indigo-800 dark:text-indigo-200 whitespace-pre-wrap mb-3";
        notesP.textContent = entry.notes;

        // Images container
        const imagesContainer = document.createElement("div");
        imagesContainer.className = "mb-3 flex flex-wrap gap-3";

        if (entry.images && Array.isArray(entry.images) && entry.images.length > 0) {
          entry.images.forEach((imgSrc, imgIndex) => {
            const imgEl = document.createElement("img");
            imgEl.src = imgSrc;
            imgEl.alt = `Travel image ${imgIndex + 1} for ${entry.location}`;
            imgEl.className = "rounded-md max-w-[150px] max-h-32 object-contain shadow-md cursor-pointer border border-indigo-300 dark:border-indigo-600";
            imgEl.tabIndex = 0;
            // Click to open full image in new tab
            imgEl.addEventListener("click", () => {
              window.open(imgSrc, "_blank");
            });
            imgEl.addEventListener("keypress", (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                window.open(imgSrc, "_blank");
              }
            });
            imagesContainer.appendChild(imgEl);
          });
        }

        const mapContainer = document.createElement("div");
        mapContainer.className = "mb-3 rounded-md overflow-hidden shadow-md";

        const weatherContainer = document.createElement("div");
        weatherContainer.className = "mb-3 text-indigo-900 dark:text-indigo-300 font-semibold";

        // Buttons container
        const buttonsContainer = document.createElement("div");
        buttonsContainer.className = "flex gap-4 justify-end flex-wrap";

        // Edit button with unique id
        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.id = `edit-${entry.id}`;
        editBtn.className = "bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-4 rounded-full transition-colors flex items-center gap-2 whitespace-nowrap";
        editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
        editBtn.addEventListener("click", () => openEditModalById(entry.id));
        buttonsContainer.appendChild(editBtn);

        // Delete button with unique id
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.id = `delete-${entry.id}`;
        deleteBtn.className = "bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-full transition-colors flex items-center gap-2 whitespace-nowrap";
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
        deleteBtn.addEventListener("click", () => deleteEntryById(entry.id));
        buttonsContainer.appendChild(deleteBtn);

        li.appendChild(headerDiv);
        li.appendChild(notesP);
        if (entry.images && entry.images.length > 0) li.appendChild(imagesContainer);
        li.appendChild(mapContainer);
        li.appendChild(weatherContainer);
        li.appendChild(buttonsContainer);

        entriesList.appendChild(li);

        (async () => {
          const coords = await geocodeLocation(entry.location);
          if (coords) {
            const iframe = document.createElement("iframe");
            iframe.width = "100%";
            iframe.height = "200";
            iframe.loading = "lazy";
            iframe.referrerPolicy = "no-referrer-when-downgrade";
            iframe.title = `Map showing location of ${entry.location}`;
            iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lon-0.05}%2C${coords.lat-0.05}%2C${parseFloat(coords.lon)+0.05}%2C${parseFloat(coords.lat)+0.05}&layer=mapnik&marker=${coords.lat}%2C${coords.lon}`;
            iframe.className = "w-full h-48 rounded-md border-0";
            mapContainer.appendChild(iframe);

            const weather = await fetchWeather(coords.lat, coords.lon);
            if (weather) {
              const weatherText = `Weather: ${weather.temperature}°C, Wind ${weather.windspeed} km/h, Direction ${weather.winddirection}°`;
              weatherContainer.textContent = weatherText;
            } else {
              weatherContainer.textContent = "Weather data not available.";
            }
          } else {
            mapContainer.textContent = "Map not available for this location.";
            weatherContainer.textContent = "Weather data not available.";
          }
        })();
      }
      // Save updated entries with IDs back to localStorage
      saveEntries(currentUserEmail, allEntriesCache);
    }

    // Delete entry by unique id
    function deleteEntryById(id) {
      if (!currentUserEmail) return;
      if (!confirm("Are you sure you want to delete this entry?")) return;
      let travelEntries = loadEntries(currentUserEmail);
      const index = travelEntries.findIndex(e => e.id === id);
      if (index === -1) return;
      travelEntries.splice(index, 1);
      saveEntries(currentUserEmail, travelEntries);
      alert("Entry deleted successfully.");
      renderEntries(searchInput.value.trim());
    }

    // Open edit modal by unique id
    function openEditModalById(id) {
      if (!currentUserEmail) return;
      const travelEntries = loadEntries(currentUserEmail);
      const index = travelEntries.findIndex(e => e.id === id);
      if (index === -1) return;
      editingEntryIndex = index;
      const entry = travelEntries[index];

      editLocation.value = entry.location || "";
      editDate.value = entry.date || "";
      editNotes.value = entry.notes || "";
      editImages.value = "";
      existingImagesContainer.innerHTML = "";

      // Show existing images with remove option
      if (entry.images && Array.isArray(entry.images) && entry.images.length > 0) {
        entry.images.forEach((imgSrc, imgIndex) => {
          const wrapper = document.createElement("div");
          wrapper.className = "relative";

          const imgEl = document.createElement("img");
          imgEl.src = imgSrc;
          imgEl.alt = `Existing image ${imgIndex + 1} for ${entry.location}`;
          imgEl.className = "rounded-md max-w-[120px] max-h-24 object-contain shadow-md border border-indigo-300 dark:border-indigo-600";

          const removeBtn = document.createElement("button");
          removeBtn.type = "button";
          removeBtn.className = "absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold focus:outline-none";
          removeBtn.title = "Remove image";
          removeBtn.innerHTML = "&times;";
          removeBtn.addEventListener("click", () => {
            // Remove image from entry.images array and update UI
            entry.images.splice(imgIndex, 1);
            saveEntryImagesUpdate(entry);
            openEditModalById(id); // Refresh modal images
          });

          wrapper.appendChild(imgEl);
          wrapper.appendChild(removeBtn);
          existingImagesContainer.appendChild(wrapper);
        });
      }

      editEntryModal.classList.remove("hidden");
      editEntryModal.focus();
    }

    // Save updated images after removal
    function saveEntryImagesUpdate(entry) {
      const travelEntries = loadEntries(currentUserEmail);
      travelEntries[editingEntryIndex] = entry;
      saveEntries(currentUserEmail, travelEntries);
    }

    // Close edit modal
    function closeEditModal() {
      editingEntryIndex = null;
      editEntryForm.reset();
      existingImagesContainer.innerHTML = "";
      editEntryModal.classList.add("hidden");
    }

    // Save changes from edit modal
    editEntryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (editingEntryIndex === null || !currentUserEmail) return;

      const locationVal = editLocation.value.trim();
      const dateVal = editDate.value;
      const notesVal = editNotes.value.trim();

      if (!locationVal || !dateVal) {
        alert("Please fill in location and date.");
        return;
      }

      const travelEntries = loadEntries(currentUserEmail);
      if (editingEntryIndex < 0 || editingEntryIndex >= travelEntries.length) return;

      const entry = travelEntries[editingEntryIndex];

      // Update basic fields
      entry.location = locationVal;
      entry.date = dateVal;
      entry.notes = notesVal;

      // Handle new images if any
      const files = Array.from(editImages.files);
      if (files.length > 0) {
        const readers = [];
        let loadedCount = 0;
        files.forEach((file, idx) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (!entry.images) entry.images = [];
            entry.images.push(event.target.result);
            loadedCount++;
            if (loadedCount === files.length) {
              // All images loaded, save and close modal
              travelEntries[editingEntryIndex] = entry;
              saveEntries(currentUserEmail, travelEntries);
              alert("Entry updated successfully!");
              closeEditModal();
              renderEntries(searchInput.value.trim());
            }
          };
          reader.readAsDataURL(file);
          readers.push(reader);
        });
      } else {
        // No new images, just save
        travelEntries[editingEntryIndex] = entry;
        saveEntries(currentUserEmail, travelEntries);
        alert("Entry updated successfully!");
        closeEditModal();
        renderEntries(searchInput.value.trim());
      }
    });

    closeEditModalBtn.addEventListener("click", closeEditModal);
    cancelEditBtn.addEventListener("click", closeEditModal);

    // Clear image preview container on file select in add entry form
    imageInput.addEventListener("change", () => {
      imagePreviewContainer.innerHTML = "";
      const files = Array.from(imageInput.files);
      if (files.length === 0) return;
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement("img");
          img.src = e.target.result;
          img.alt = `Image preview for new travel entry`;
          img.className = "image-preview max-w-[120px] max-h-32 object-contain shadow-md rounded-md";
          imagePreviewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
      });
    });

    // Clear signup form error messages and aria-invalid
    function clearSignupErrors() {
      [errorFirstname, errorEmail, errorPassword, errorConfirmPassword].forEach(el => {
        el.textContent = "";
        el.classList.add("hidden");
      });
      ["signupFirstname", "signupEmail", "signupPassword", "signupConfirmPassword"].forEach(id => {
        const input = document.getElementById(id);
        if(input) input.setAttribute("aria-invalid", "false");
      });
    }

    // Signup form submit handler with validation and password hashing
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearSignupErrors();

      const firstnameInput = signupForm.firstname;
      const emailInput = signupForm.email;
      const passwordInput = signupForm.password;
      const confirmPasswordInput = signupForm.confirmPassword;

      const firstname = firstnameInput.value.trim();
      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      let valid = true;

      if (!firstname) {
        errorFirstname.textContent = "Firstname is required.";
        errorFirstname.classList.remove("hidden");
        firstnameInput.setAttribute("aria-invalid", "true");
        valid = false;
      }
      if (!email) {
        errorEmail.textContent = "Email is required.";
        errorEmail.classList.remove("hidden");
        emailInput.setAttribute("aria-invalid", "true");
        valid = false;
      } else {
        // Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          errorEmail.textContent = "Please enter a valid email address.";
          errorEmail.classList.remove("hidden");
          emailInput.setAttribute("aria-invalid", "true");
          valid = false;
        }
      }
      if (!password) {
        errorPassword.textContent = "Password is required.";
        errorPassword.classList.remove("hidden");
        passwordInput.setAttribute("aria-invalid", "true");
        valid = false;
      }
      if (!confirmPassword) {
        errorConfirmPassword.textContent = "Confirm Password is required.";
        errorConfirmPassword.classList.remove("hidden");
        confirmPasswordInput.setAttribute("aria-invalid", "true");
        valid = false;
      }
      if (password && confirmPassword && password !== confirmPassword) {
        errorConfirmPassword.textContent = "Passwords do not match!";
        errorConfirmPassword.classList.remove("hidden");
        confirmPasswordInput.setAttribute("aria-invalid", "true");
        valid = false;
      }

      if (!valid) return;

      if (getUser(email)) {
        alert("User with this email already exists. Please login.");
        showLogin();
        return;
      }

      const hashedPassword = CryptoJS.SHA256(password).toString();

      saveUser({ firstname, email, password: hashedPassword });
      savePublicProfile(email, false);
      alert("Signup successful! Please login.");
      showLogin();
      signupForm.reset();
    });

    // Login form submit handler with password hash check and forgot password UI
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      forgotPasswordContainer.classList.add("hidden");
      forgotPasswordMessage.classList.add("hidden");
      const email = loginForm.email.value.trim().toLowerCase();
      const password = loginForm.password.value;

      const user = getUser(email);
      if (!user) {
        alert("User not found. Please signup.");
        showSignup();
        return;
      }
      const hashedPassword = CryptoJS.SHA256(password).toString();
      if (user.password !== hashedPassword) {
        forgotPasswordContainer.classList.remove("hidden");
        forgotPasswordMessage.classList.add("hidden");
        return;
      }

      currentUserEmail = email;
      showTravelMainPage();
      loginForm.reset();
    });

    forgotPasswordBtn.addEventListener("click", () => {
      const email = loginForm.email.value.trim().toLowerCase();
      if (!email) {
        alert("Please enter your email to receive a reset link.");
        return;
      }
      const user = getUser(email);
      if (!user) {
        alert("Email not found in our records.");
        return;
      }
      forgotPasswordMessage.textContent = `A password reset link has been sent to ${email}. Please check your inbox.`;
      forgotPasswordMessage.classList.remove("hidden");
      forgotPasswordContainer.classList.add("hidden");
    });

    logoutBtnMain.addEventListener("click", () => {
      currentUserEmail = null;
      showAuthPage();
    });
    logoutBtnEntries.addEventListener("click", () => {
      currentUserEmail = null;
      showAuthPage();
    });
    logoutBtnProfile.addEventListener("click", () => {
      currentUserEmail = null;
      showAuthPage();
    });

    goToLoginBtn.addEventListener("click", () => {
      showLogin();
    });

    goToSignupBtn.addEventListener("click", () => {
      showSignup();
    });

    // Save profile changes
    saveProfileBtn.addEventListener("click", () => {
      if (!currentUserEmail) return;
      const user = getUser(currentUserEmail);
      if (!user) return;
      const newFirstname = profileFirstname.value.trim();
      if (!newFirstname) {
        alert("Firstname cannot be empty.");
        return;
      }
      user.firstname = newFirstname;
      saveUser(user);
      alert("Profile saved.");
      loadUserProfile();
    });

    // Toggle public profile status
    togglePublicProfileBtn.addEventListener("click", () => {
      if (!currentUserEmail) return;
      const isPublic = loadPublicProfile(currentUserEmail);
      const newStatus = !isPublic;
      savePublicProfile(currentUserEmail, newStatus);
      updatePublicProfileUI(newStatus);
    });

    // Update public profile UI text and button
    function updatePublicProfileUI(isPublic) {
      if (isPublic) {
        publicProfileStatus.textContent = "Your profile is PUBLIC.";
        togglePublicProfileBtn.textContent = "Make Profile Private";
        togglePublicProfileBtn.classList.remove("bg-indigo-400");
        togglePublicProfileBtn.classList.add("bg-red-600", "hover:bg-red-700");
      } else {
        publicProfileStatus.textContent = "Your profile is PRIVATE.";
        togglePublicProfileBtn.textContent = "Make Profile Public";
        togglePublicProfileBtn.classList.add("bg-indigo-400");
        togglePublicProfileBtn.classList.remove("bg-red-600", "hover:bg-red-700");
      }
    }

    // Handle new travel entry submission
    travelForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!currentUserEmail) {
        alert("Please login first.");
        return;
      }
      const location = travelForm.location.value.trim();
      const date = travelForm.date.value;
      const notes = travelForm.notes.value.trim();

      if (!location || !date) {
        alert("Please fill in location and date.");
        return;
      }

      const files = Array.from(imageInput.files);
      if (files.length > 0) {
        const readers = [];
        let loadedCount = 0;
        const imagesDataUrls = [];
        files.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            imagesDataUrls.push(event.target.result);
            loadedCount++;
            if (loadedCount === files.length) {
              addEntry(location, date, notes, imagesDataUrls);
            }
          };
          reader.readAsDataURL(file);
          readers.push(reader);
        });
      } else {
        addEntry(location, date, notes, []);
      }
    });

    // Add entry helper with unique id
    function addEntry(location, date, notes, imagesDataUrls) {
      const travelEntries = loadEntries(currentUserEmail);
      const newEntry = { id: generateUniqueId(), location, date, notes, images: imagesDataUrls };
      travelEntries.push(newEntry);
      saveEntries(currentUserEmail, travelEntries);
      alert("Entry added successfully!");
      travelForm.reset();
      imagePreviewContainer.innerHTML = "";
      renderEntries();
    }

    // Load user profile info into profile section
    function loadUserProfile() {
      if (!currentUserEmail) return;
      const user = getUser(currentUserEmail);
      if (!user) return;
      profileFirstname.value = user.firstname || "";
      profileEmail.value = user.email || "";
      const isPublic = loadPublicProfile(currentUserEmail);
      updatePublicProfileUI(isPublic);
    }

    // Dark mode toggle shared function
    function toggleDarkMode(button) {
      darkMode = !darkMode;
      if (darkMode) {
        document.body.classList.add("bg-gray-900", "text-indigo-200");
        document.body.classList.remove("bg-white", "text-indigo-900");
        travelMainPage.classList.add("bg-gradient-to-b", "from-gray-800", "to-gray-900");
        travelMainPage.classList.remove("bg-gradient-to-b", "from-sky-300", "to-sky-100");
        travelEntriesPage.classList.add("bg-gradient-to-b", "from-gray-800", "to-gray-900");
        travelEntriesPage.classList.remove("bg-gradient-to-b", "from-sky-300", "to-sky-100");
        profilePage.classList.add("bg-gradient-to-b", "from-gray-800", "to-gray-900");
        profilePage.classList.remove("bg-gradient-to-b", "from-sky-300", "to-sky-100");
        button.innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
      } else {
        document.body.classList.remove("bg-gray-900", "text-indigo-200");
        document.body.classList.add("bg-white", "text-indigo-900");
        travelMainPage.classList.remove("bg-gradient-to-b", "from-gray-800", "to-gray-900");
        travelMainPage.classList.add("bg-gradient-to-b", "from-sky-300", "to-sky-100");
        travelEntriesPage.classList.remove("bg-gradient-to-b", "from-gray-800", "to-gray-900");
        travelEntriesPage.classList.add("bg-gradient-to-b", "from-sky-300", "to-sky-100");
        profilePage.classList.remove("bg-gradient-to-b", "from-gray-800", "to-gray-900");
        profilePage.classList.add("bg-gradient-to-b", "from-sky-300", "to-sky-100");
        button.innerHTML = '<i class="fas fa-moon"></i><span>Dark Mode</span>';
      }
    }

    darkModeToggleMain.addEventListener("click", () => toggleDarkMode(darkModeToggleMain));
    darkModeToggleEntries.addEventListener("click", () => toggleDarkMode(darkModeToggleEntries));
    darkModeToggleProfile.addEventListener("click", () => toggleDarkMode(darkModeToggleProfile));

    // Navigation buttons
    showEntriesBtn.addEventListener("click", () => {
      showTravelEntriesPage();
    });
    backToMainBtn.addEventListener("click", () => {
      showTravelMainPage();
    });
    backToMainFromProfileBtn.addEventListener("click", () => {
      showTravelMainPage();
    });
    goToProfileBtn.addEventListener("click", () => {
      showProfilePage();
    });

    // Remove dark mode classes from body and pages
    function removeDarkMode() {
      darkMode = false;
      document.body.classList.remove("bg-gray-900", "text-indigo-200");
      document.body.classList.add("bg-white", "text-indigo-900");
      travelMainPage.classList.remove("bg-gradient-to-b", "from-gray-800", "to-gray-900");
      travelMainPage.classList.add("bg-gradient-to-b", "from-sky-300", "to-sky-100");
      travelEntriesPage.classList.remove("bg-gradient-to-b", "from-gray-800", "to-gray-900");
      travelEntriesPage.classList.add("bg-gradient-to-b", "from-sky-300", "to-sky-100");
      profilePage.classList.remove("bg-gradient-to-b", "from-gray-800", "to-gray-900");
      profilePage.classList.add("bg-gradient-to-b", "from-sky-300", "to-sky-100");
      darkModeToggleMain.innerHTML = '<i class="fas fa-moon"></i><span>Dark Mode</span>';
      darkModeToggleEntries.innerHTML = '<i class="fas fa-moon"></i><span>Dark Mode</span>';
      darkModeToggleProfile.innerHTML = '<i class="fas fa-moon"></i><span>Dark Mode</span>';
    }

    // Apply dark mode classes if darkMode is true
    function applyDarkMode() {
      if (darkMode) {
        document.body.classList.add("bg-gray-900", "text-indigo-200");
        document.body.classList.remove("bg-white", "text-indigo-900");
        travelMainPage.classList.add("bg-gradient-to-b", "from-gray-800", "to-gray-900");
        travelMainPage.classList.remove("bg-gradient-to-b", "from-sky-300", "to-sky-100");
        travelEntriesPage.classList.add("bg-gradient-to-b", "from-gray-800", "to-gray-900");
        travelEntriesPage.classList.remove("bg-gradient-to-b", "from-sky-300", "to-sky-100");
        profilePage.classList.add("bg-gradient-to-b", "from-gray-800", "to-gray-900");
        profilePage.classList.remove("bg-gradient-to-b", "from-sky-300", "to-sky-100");
        darkModeToggleMain.innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
        darkModeToggleEntries.innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
        darkModeToggleProfile.innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
      } else {
        removeDarkMode();
      }
    }

    // Search input event for filtering entries
    searchInput.addEventListener("input", () => {
      const filter = searchInput.value.trim();
      renderEntries(filter);
    });
    if(mobileSearchInput){
      mobileSearchInput.addEventListener("input", () => {
        const filter = mobileSearchInput.value.trim();
        renderEntries(filter);
      });
    }

    // Mobile menu toggle handlers
    function toggleMobileMenu(menu) {
      if (menu.classList.contains("hidden")) {
        closeAllMobileMenus();
        menu.classList.remove("hidden");
      } else {
        menu.classList.add("hidden");
      }
    }
    function closeAllMobileMenus() {
      if(mobileMenu) mobileMenu.classList.add("hidden");
      if(mobileMenuEntries) mobileMenuEntries.classList.add("hidden");
      if(mobileMenuProfile) mobileMenuProfile.classList.add("hidden");
    }

    // Main page mobile menu
    if(mobileMenuBtn && mobileMenu){
      mobileMenuBtn.addEventListener("click", () => {
        toggleMobileMenu(mobileMenu);
      });
      mobileDarkModeToggle.addEventListener("click", () => {
        toggleDarkMode(darkModeToggleMain);
        toggleDarkMode(darkModeToggleEntries);
        toggleDarkMode(darkModeToggleProfile);
        toggleMobileMenu(mobileMenu);
      });
      mobileShowEntriesBtn.addEventListener("click", () => {
        showTravelEntriesPage();
        toggleMobileMenu(mobileMenu);
      });
      mobileGoToProfileBtn.addEventListener("click", () => {
        showProfilePage();
        toggleMobileMenu(mobileMenu);
      });
      mobileLogoutBtnMain.addEventListener("click", () => {
        currentUserEmail = null;
        showAuthPage();
        toggleMobileMenu(mobileMenu);
      });
    }

    // Entries page mobile menu
    if(mobileMenuBtnEntries && mobileMenuEntries){
      mobileMenuBtnEntries.addEventListener("click", () => {
        toggleMobileMenu(mobileMenuEntries);
      });
      mobileDarkModeToggleEntries.addEventListener("click", () => {
        toggleDarkMode(darkModeToggleMain);
        toggleDarkMode(darkModeToggleEntries);
        toggleDarkMode(darkModeToggleProfile);
        toggleMobileMenu(mobileMenuEntries);
      });
      mobileBackToMainBtn.addEventListener("click", () => {
        showTravelMainPage();
        toggleMobileMenu(mobileMenuEntries);
      });
      mobileLogoutBtnEntries.addEventListener("click", () => {
        currentUserEmail = null;
        showAuthPage();
        toggleMobileMenu(mobileMenuEntries);
      });
      if(mobileSearchInput){
        mobileSearchInput.addEventListener("keydown", (e) => {
          if(e.key === "Escape"){
            mobileSearchInput.value = "";
            renderEntries("");
          }
        });
      }
    }

    // Profile page mobile menu
    if(mobileMenuBtnProfile && mobileMenuProfile){
      mobileMenuBtnProfile.addEventListener("click", () => {
        toggleMobileMenu(mobileMenuProfile);
      });
      mobileDarkModeToggleProfile.addEventListener("click", () => {
        toggleDarkMode(darkModeToggleMain);
        toggleDarkMode(darkModeToggleEntries);
        toggleDarkMode(darkModeToggleProfile);
        toggleMobileMenu(mobileMenuProfile);
      });
      mobileBackToMainFromProfileBtn.addEventListener("click", () => {
        showTravelMainPage();
        toggleMobileMenu(mobileMenuProfile);
      });
      mobileLogoutBtnProfile.addEventListener("click", () => {
        currentUserEmail = null;
        showAuthPage();
        toggleMobileMenu(mobileMenuProfile);
      });
    }

    // Initialize page showing signup form
    showSignup();
