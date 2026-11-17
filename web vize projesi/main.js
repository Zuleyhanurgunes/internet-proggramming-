/**
 * CEN227 Internet Programming Midterm Project
 * Yemek Tarifleri Portalı - Temel JavaScript (main.js)
 * 
 * Bu dosya sayfalar arası veri akışını, DOM etkileşimlerini,
 * arama/filtreleme işlemlerini ve form doğrulamasını yönetir.
 */

document.addEventListener("DOMContentLoaded", () => {
  setupActiveNavLink();

  // Hangi sayfada olduğumuzu belirleyip ilgili başlatıcı fonksiyonu çalıştırıyoruz
  const path = window.location.pathname.toLowerCase();

  if (path.endsWith("detail.html")) {
    initDetailPage();
  } else if (path.endsWith("form.html")) {
    initFormPage();
  } else if (path.endsWith("table.html")) {
    initTablePage();
  } else {
    // index.html veya kök dizin
    initListPage();
  }
});

/**
 * 1. Menüde aktif sayfa linkini işaretler
 */
function setupActiveNavLink() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/**
 * ==========================================================
 * 2. LİSTE SAYFASI MANTIĞI (index.html)
 * ==========================================================
 */
function initListPage() {
  const gridContainer = document.getElementById("recipe-grid");
  const searchInput = document.getElementById("search-input");
  const chipButtons = document.querySelectorAll(".chip-btn");
  const countBadge = document.getElementById("recipe-count");

  if (!gridContainer) return;

  const allRecipes = getRecipes();
  let currentCategory = "all";
  let searchQuery = "";

  function render() {
    const filtered = allRecipes.filter(recipe => {
      const matchesCategory = currentCategory === "all" || recipe.category.toLowerCase() === currentCategory.toLowerCase();
      const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (countBadge) {
      countBadge.textContent = `${filtered.length} tarif listeleniyor`;
    }

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 50px 20px; background: #fff; border-radius: 12px; border: 1px dashed #cbd5e1;">
          <h3 style="color: #64748b; margin-bottom: 8px;">Aradığınız kriterlere uygun tarif bulunamadı.</h3>
          <p style="color: #94a3b8; font-size: 0.95rem;">Farklı bir arama terimi deneyebilir, yeni bir tarif gönderebilir veya varsayılan tarifleri geri yükleyebilirsiniz.</p>
          <div style="margin-top: 15px; display: flex; justify-content: center; gap: 10px;">
            <a href="form.html" class="btn btn-primary">+ Yeni Tarif Ekle</a>
            <button onclick="handleResetDefaults()" class="btn btn-secondary">Varsayılanları Geri Yükle</button>
          </div>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = filtered.map(recipe => `
      <div class="recipe-card">
        <div class="card-img-wrapper">
          <img src="${recipe.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80'}" alt="${recipe.name}" class="card-img" onerror="this.src='https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80'">
          <span class="card-badge">${recipe.category}</span>
        </div>
        <div class="card-content">
          <h3 class="card-title">${recipe.name}</h3>
          <p class="card-desc">${recipe.description}</p>
          <div class="card-meta">
            <span class="meta-item">⏱ ${recipe.prepTime} haz.</span>
            <span class="meta-item">🔥 ${recipe.cookTime} piş.</span>
            <span class="meta-item">🍽 ${recipe.servings}</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <a href="detail.html?id=${recipe.id}" class="card-action-btn" style="flex: 1;">Tarifi İncele →</a>
            <button type="button" class="card-del-btn" onclick="handleDeleteFromList(${recipe.id}, '${recipe.name.replace(/'/g, "\\'")}')" title="Tarifi Sil">🗑️</button>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Arama dinleyicisi
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      render();
    });
  }

  // Kategori butonları dinleyicisi
  chipButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      chipButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-category");
      render();
    });
  });

  // İlk yükleme
  render();
}

/**
 * ==========================================================
 * 3. DETAY SAYFASI MANTIĞI (detail.html)
 * ==========================================================
 */
function initDetailPage() {
  const container = document.getElementById("detail-container");
  if (!container) return;

  // URL'den id parametresini al
  const urlParams = new URLSearchParams(window.location.search);
  let recipeId = urlParams.get("id");

  const recipes = getRecipes();

  // ID verilmemişse veya listede yoksa ilk tarifi varsayılan al
  let recipe = recipes.find(r => String(r.id) === String(recipeId));
  if (!recipe && recipes.length > 0) {
    recipe = recipes[0];
    recipeId = recipe.id;
  }

  if (!recipe) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px; background: #fff; border-radius: 12px;">
        <h2>Tarif Bulunamadı</h2>
        <p style="margin: 15px 0;">İstediğiniz tarif sistemde kayıtlı değil.</p>
        <a href="index.html" class="btn btn-primary">Tarif Listesine Dön</a>
      </div>
    `;
    return;
  }

  // Sayfa başlığını güncelle
  document.title = `${recipe.name} | Yemek Tarifleri Portalı`;

  // Malzemeler listesi HTML'i
  const ingredientsHtml = (recipe.ingredients || []).map(item => `<li>${item}</li>`).join("");

  // Hazırlanış adımları HTML'i
  const instructionsHtml = (recipe.instructions || []).map(step => `<li>${step}</li>`).join("");

  // Diğer tariflerin hızlı geçiş dropdown'ı
  const quickSelectOptions = recipes.map(r => `
    <option value="${r.id}" ${String(r.id) === String(recipe.id) ? "selected" : ""}>${r.name} (${r.category})</option>
  `).join("");

  container.innerHTML = `
    <!-- Hızlı Tarif Değiştirme Çubuğu -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
      <a href="index.html" class="btn btn-secondary">← Tüm Tarifler</a>
      <div style="display: flex; align-items: center; gap: 8px;">
        <label for="recipe-selector" style="font-size: 0.9rem; font-weight: 600; color: #475569;">Başka Tarif İncele:</label>
        <select id="recipe-selector" class="form-control" style="width: auto; padding: 6px 12px;">
          ${quickSelectOptions}
        </select>
      </div>
    </div>

    <!-- Detay Kartı -->
    <div class="detail-card">
      <div class="detail-header">
        <img src="${recipe.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1200&q=80'}" alt="${recipe.name}" onerror="this.src='https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1200&q=80'">
        <div class="detail-overlay">
          <span class="card-badge" style="position: static; display: inline-block; margin-bottom: 8px;">${recipe.category}</span>
          <h1 class="detail-title">${recipe.name}</h1>
          <p class="detail-subtitle">${recipe.description}</p>
        </div>
      </div>

      <div class="detail-body">
        <!-- Bilgi Rozetleri -->
        <div class="meta-badges-row">
          <div class="meta-badge-box">
            <span class="label">Hazırlama Süresi</span>
            <span class="val">⏱ ${recipe.prepTime}</span>
          </div>
          <div class="meta-badge-box">
            <span class="label">Pişirme Süresi</span>
            <span class="val">🔥 ${recipe.cookTime}</span>
          </div>
          <div class="meta-badge-box">
            <span class="label">Porsiyon</span>
            <span class="val">🍽 ${recipe.servings}</span>
          </div>
          <div class="meta-badge-box">
            <span class="label">Zorluk Derecesi</span>
            <span class="val">⭐ ${recipe.difficulty || "Orta"}</span>
          </div>
        </div>

        <!-- İki Sütunlu Detay Alanı -->
        <div class="detail-grid">
          <!-- Sol Sütun: Malzemeler ve Besin Değerleri -->
          <div>
            <div class="section-box" style="margin-bottom: 25px;">
              <h2 class="section-box-title">🛒 Gerekli Malzemeler</h2>
              <ul class="ingredients-list">
                ${ingredientsHtml}
              </ul>
            </div>

            <div class="section-box">
              <h2 class="section-box-title">📊 Porsiyon Başına Besin Değeri</h2>
              <div class="nutrition-mini-grid">
                <div class="nutrition-mini-card">
                  <div class="num">${recipe.nutrition?.calories || 0}</div>
                  <div class="unit">Kalori (kcal)</div>
                </div>
                <div class="nutrition-mini-card">
                  <div class="num">${recipe.nutrition?.protein || 0}g</div>
                  <div class="unit">Protein</div>
                </div>
                <div class="nutrition-mini-card">
                  <div class="num">${recipe.nutrition?.carbs || 0}g</div>
                  <div class="unit">Karb</div>
                </div>
                <div class="nutrition-mini-card">
                  <div class="num">${recipe.nutrition?.fat || 0}g</div>
                  <div class="unit">Yağ</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sağ Sütun: Hazırlanış Adımları -->
          <div>
            <div class="section-box" style="height: 100%;">
              <h2 class="section-box-title">👩‍🍳 Adım Adım Hazırlanışı</h2>
              <ol class="instructions-list">
                ${instructionsHtml}
              </ol>
            </div>
          </div>
        </div>

        <!-- Alt Aksiyon Butonları -->
        <div class="detail-actions">
          <a href="table.html" class="btn btn-outline">📊 Tüm Besin Değerlerini Karşılaştır</a>
          <a href="form.html" class="btn btn-primary">+ Kendi Tarifini Paylaş</a>
          <button type="button" id="delete-recipe-btn" class="btn btn-danger" style="margin-left: auto;">
            🗑️ Bu Tarifi Sil
          </button>
        </div>
      </div>
    </div>
  `;

  // Tarifi Sil butonu dinleyicisi
  const delBtn = document.getElementById("delete-recipe-btn");
  if (delBtn) {
    delBtn.addEventListener("click", () => {
      if (confirm(`"${recipe.name}" tarifini silmek istediğinize emin misiniz?`)) {
        deleteRecipe(recipe.id);
        alert(`"${recipe.name}" başarıyla silindi.`);
        window.location.href = "index.html";
      }
    });
  }

  // Dropdown değiştirildiğinde sayfayı yeni ID ile yeniden yükle
  const selector = document.getElementById("recipe-selector");
  if (selector) {
    selector.addEventListener("change", (e) => {
      window.location.href = `detail.html?id=${e.target.value}`;
    });
  }
}

/**
 * ==========================================================
 * 4. FORM SAYFASI MANTIĞI & DOĞRULAMA (form.html)
 * ==========================================================
 */
function initFormPage() {
  const form = document.getElementById("recipe-form");
  const successAlert = document.getElementById("success-alert");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Hata mesajlarını ve hata stillerini sıfırla
    clearFormErrors();

    let isValid = true;

    // Alanları yakala
    const nameInput = document.getElementById("name");
    const categoryInput = document.getElementById("category");
    const prepTimeInput = document.getElementById("prepTime");
    const cookTimeInput = document.getElementById("cookTime");
    const servingsInput = document.getElementById("servings");
    const difficultyInput = document.getElementById("difficulty");
    const imageInput = document.getElementById("image");
    const descInput = document.getElementById("description");
    const ingredientsInput = document.getElementById("ingredients");
    const instructionsInput = document.getElementById("instructions");
    const caloriesInput = document.getElementById("calories");
    const proteinInput = document.getElementById("protein");
    const carbsInput = document.getElementById("carbs");
    const fatInput = document.getElementById("fat");

    // 1. Tarif Adı Kontrolü (En az 3 karakter)
    if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
      showError(nameInput, "name-error", "Tarif adı en az 3 karakter olmalıdır.");
      isValid = false;
    }

    // 2. Kategori Kontrolü
    if (!categoryInput.value) {
      showError(categoryInput, "category-error", "Lütfen bir kategori seçiniz.");
      isValid = false;
    }

    // 3. Hazırlama ve Pişirme Süresi
    if (!prepTimeInput.value.trim()) {
      showError(prepTimeInput, "prepTime-error", "Hazırlama süresi boş bırakılamaz (örn: 15 dk).");
      isValid = false;
    }
    if (!cookTimeInput.value.trim()) {
      showError(cookTimeInput, "cookTime-error", "Pişirme süresi boş bırakılamaz (örn: 30 dk).");
      isValid = false;
    }

    // 4. Porsiyon
    if (!servingsInput.value.trim()) {
      showError(servingsInput, "servings-error", "Porsiyon bilgisi gereklidir (örn: 4 Kişilik).");
      isValid = false;
    }

    // 5. Açıklama (En az 10 karakter)
    if (!descInput.value.trim() || descInput.value.trim().length < 10) {
      showError(descInput, "description-error", "Lütfen tarif hakkında en az 10 karakterlik açıklama yazınız.");
      isValid = false;
    }

    // 6. Malzemeler
    const ingredientsList = ingredientsInput.value
      .split("\n")
      .map(item => item.trim())
      .filter(item => item.length > 0);

    if (ingredientsList.length === 0) {
      showError(ingredientsInput, "ingredients-error", "Lütfen en az bir malzeme satırı ekleyiniz.");
      isValid = false;
    }

    // 7. Hazırlanış Adımları
    const instructionsList = instructionsInput.value
      .split("\n")
      .map(item => item.trim())
      .filter(item => item.length > 0);

    if (instructionsList.length === 0) {
      showError(instructionsInput, "instructions-error", "Lütfen en az bir yapılış adımı ekleyiniz.");
      isValid = false;
    }

    // 8. Besin Değerleri Kontrolü (Sayı ve 0'dan büyük/eşit)
    const caloriesVal = Number(caloriesInput.value);
    const proteinVal = Number(proteinInput.value);
    const carbsVal = Number(carbsInput.value);
    const fatVal = Number(fatInput.value);

    if (isNaN(caloriesVal) || caloriesVal < 0 || caloriesInput.value === "") {
      showError(caloriesInput, "nutrition-error", "Lütfen geçerli bir kalori değeri giriniz.");
      isValid = false;
    }
    if (isNaN(proteinVal) || proteinVal < 0 || proteinInput.value === "") {
      showError(proteinInput, "nutrition-error", "Lütfen geçerli bir protein değeri giriniz.");
      isValid = false;
    }
    if (isNaN(carbsVal) || carbsVal < 0 || carbsInput.value === "") {
      showError(carbsInput, "nutrition-error", "Lütfen geçerli bir karbonhidrat değeri giriniz.");
      isValid = false;
    }
    if (isNaN(fatVal) || fatVal < 0 || fatInput.value === "") {
      showError(fatInput, "nutrition-error", "Lütfen geçerli bir yağ değeri giriniz.");
      isValid = false;
    }

    if (!isValid) {
      // Sayfayı ilk hata alanına kaydır
      const firstError = document.querySelector(".form-control.error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        firstError.focus();
      }
      return;
    }

    // Veri objesini oluştur
    const newRecipeData = {
      name: nameInput.value.trim(),
      category: categoryInput.value,
      prepTime: prepTimeInput.value.trim(),
      cookTime: cookTimeInput.value.trim(),
      servings: servingsInput.value.trim(),
      difficulty: difficultyInput.value,
      image: imageInput.value.trim() || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80",
      description: descInput.value.trim(),
      ingredients: ingredientsList,
      instructions: instructionsList,
      nutrition: {
        calories: caloriesVal,
        protein: proteinVal,
        carbs: carbsVal,
        fat: fatVal
      }
    };

    // data.js üzerinden LocalStorage'a ekle
    const saved = addRecipe(newRecipeData);

    // Başarı mesajı göster
    if (successAlert) {
      successAlert.innerHTML = `
        <strong>Tebrikler!</strong> "${saved.name}" başlıklı tarifiniz başarıyla eklendi.
        <div style="margin-top: 8px;">
          <a href="detail.html?id=${saved.id}" class="btn btn-primary" style="padding: 6px 14px; font-size: 0.85rem;">Tarifi Hemen Görüntüle →</a>
          <a href="index.html" class="btn btn-secondary" style="padding: 6px 14px; font-size: 0.85rem; margin-left: 6px;">Tüm Listeye Dön</a>
        </div>
      `;
      successAlert.style.display = "block";
      successAlert.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Formu temizle
    form.reset();
  });
}

function showError(inputEl, errorElId, message) {
  inputEl.classList.add("error");
  const errorEl = document.getElementById(errorElId);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add("show");
  }
}

function clearFormErrors() {
  document.querySelectorAll(".form-control").forEach(el => el.classList.remove("error"));
  document.querySelectorAll(".error-message").forEach(el => {
    el.textContent = "";
    el.classList.remove("show");
  });
}

/**
 * ==========================================================
 * 5. TABLO SAYFASI MANTIĞI (table.html)
 * ==========================================================
 */
function initTablePage() {
  const tableBody = document.getElementById("table-body");
  const searchInput = document.getElementById("table-search");
  const statTotal = document.getElementById("stat-total");
  const statAvgCal = document.getElementById("stat-avg-cal");
  const statTopProtein = document.getElementById("stat-top-protein");
  const statLowestCal = document.getElementById("stat-lowest-cal");

  if (!tableBody) return;

  const recipes = getRecipes();

  // İstatistikleri hesapla
  if (recipes.length > 0) {
    if (statTotal) statTotal.textContent = recipes.length;

    const totalCal = recipes.reduce((sum, r) => sum + (Number(r.nutrition?.calories) || 0), 0);
    const avgCal = Math.round(totalCal / recipes.length);
    if (statAvgCal) statAvgCal.textContent = `${avgCal} kcal`;

    const topProteinRecipe = [...recipes].sort((a, b) => (b.nutrition?.protein || 0) - (a.nutrition?.protein || 0))[0];
    if (statTopProtein) {
      statTopProtein.textContent = `${topProteinRecipe.name} (${topProteinRecipe.nutrition?.protein}g)`;
    }

    const lowestCalRecipe = [...recipes].sort((a, b) => (a.nutrition?.calories || 0) - (b.nutrition?.calories || 0))[0];
    if (statLowestCal) {
      statLowestCal.textContent = `${lowestCalRecipe.name} (${lowestCalRecipe.nutrition?.calories} kcal)`;
    }
  }

  function renderTable(filterQuery = "") {
    const filtered = recipes.filter(r => {
      const q = filterQuery.toLowerCase();
      return r.name.toLowerCase().includes(q) || r.category.toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align: center; padding: 30px; color: #64748b;">
            Eşleşen tarif veya besin verisi bulunamadı.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map((recipe, index) => `
      <tr>
        <td style="font-weight: 600; color: #64748b;">${index + 1}</td>
        <td>
          <strong style="color: #1e293b;">${recipe.name}</strong>
        </td>
        <td>
          <span style="background: #f1f5f9; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; color: #475569;">
            ${recipe.category}
          </span>
        </td>
        <td>${recipe.servings}</td>
        <td><span class="cal-badge">${recipe.nutrition?.calories || 0} kcal</span></td>
        <td><strong>${recipe.nutrition?.protein || 0}</strong> g</td>
        <td><strong>${recipe.nutrition?.carbs || 0}</strong> g</td>
        <td><strong>${recipe.nutrition?.fat || 0}</strong> g</td>
        <td>
          <a href="detail.html?id=${recipe.id}" class="table-link-btn">İncele →</a>
          <button type="button" class="table-del-btn" onclick="handleDeleteFromTable(${recipe.id}, '${recipe.name.replace(/'/g, "\\'")}')">Sil</button>
        </td>
      </tr>
    `).join("");
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderTable(e.target.value.trim());
    });
  }

  // İlk tablo yüklemesi
  renderTable();
}

/**
 * ==========================================================
 * 6. KÜRESEL SİLME VE SIFIRLAMA FONKSİYONLARI
 * ==========================================================
 */

// Liste sayfasından silme
window.handleDeleteFromList = function(id, name) {
  if (confirm(`"${name}" tarifini silmek istediğinize emin misiniz?`)) {
    deleteRecipe(id);
    initListPage();
  }
};

// Tablo sayfasından silme
window.handleDeleteFromTable = function(id, name) {
  if (confirm(`"${name}" tarifini tablodan silmek istediğinize emin misiniz?`)) {
    deleteRecipe(id);
    initTablePage();
  }
};

// Tüm tarifleri varsayılana sıfırlama
window.handleResetDefaults = function() {
  if (confirm("Varsayılan tarifleri geri yüklemek istediğinize emin misiniz?")) {
    resetRecipesToDefault();
    window.location.reload();
  }
};
