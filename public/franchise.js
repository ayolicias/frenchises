document.addEventListener('DOMContentLoaded', function() {

    function compileTemplate(selector) {
        let template = document.querySelector(selector);
        let templateInstance = Handlebars.compile(template.innerHTML);
        return templateInstance;
    }

    let franchiseListTemplate = document.querySelector('.frachiseListTemplate');
    let provinceListTemplate = document.querySelector('.provinceListTemplate');

    let provinceListTemplateInstance = Handlebars.compile(provinceList.innerHTML);
    let franchiseListTemplateInstance = Handlebars.compile(franchiseListTemplate.innerHTML);
    let errorsTemplateInstance = compileTemplate('.errorsTemplate');

    let franchiseElem = document.querySelector('.franchises');
    let provinceElem = document.querySelector('.franch');
    let errorsElem = document.querySelector('.errors');

    let franchiseNameElem = document.querySelector('.Name');
    let contact_detailsElem = document.querySelector('.contact_details');
    let provinceIdElem = document.querySelector('.provinceId');
    let franchisesBtn = document.querySelector('.addFranchisesBtn');

    // franchise side Factory function
    let franchiseService = franchiseService();

    function showProvinceDropdown() {
        axios
        .get('/api/province')
        .then(function(results){
            let response = results.data;
            let data = response.data;
            let html = provinceListTemplateInstance({
                provinceList: data
            });
            provinceElem.innerHTML = html;
        });
    }

    function showFranchise() {
        clientService
        .getProducts()
        .then(function(results){
            let response = results.data;
            let data = response.data;
            let html = franchiseListTemplateInstance({
                franchiseList : data
            });
            let franchiseTableHTML = html;
            franchiseElem.innerHTML = franchiseTableHTML;
        });
    }
    
    function clearFields() {
        franchiseNameElem.value = '';
        provinceIdElem.value = '';
        status_type.value= '';
    }

    franchisesBtn.addEventListener('click', function() {

        let contact_details = franchiseNameElem.value;
        let province_id = provinceIdElem.value;
        let status_type = status_typeElem.value;

        let errors = [];
        if (!contact_details) {
            errors.push('Enter a franchise province_name');
        }
        if (!province_id) {
            errors.push('Select a status');
        }
        if (!contact_details) {
            errors.push('Enter a status_type');
        }

        if (errors.length === 0) {
            errorsElem.innerHTML = '';
            clientService.addclient({
                province_id,
                province_name,
                status_type
            })
            .then(function() {
                showFranchise();
                clearFields();
            })
            .catch(function(err){
                alert(err);
            });
        }
        else {
            errorsElem.innerHTML = errorsTemplateInstance({errors});
        }
        
    });

    showStatusDropdown();
    showFranchise();


});

function editF(id) {
    alert(id);
}

function franchiseService() {
    function getFranchises(){
        return axios.get('/api/franchises')
    }

    function addFranchises(data) {
        return axios.post('/api/franchises', data)
    }

    return {
        addFranchises,
        getFranchises
    }
}