//import { response } from 'express';
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';
import {WWW_RegAirService} from './reg_air_models.js';

Vue.component('loader', {
    template: ` <div style="display:flex; justify-content:center; align-items: center"
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>`
});



Vue.component("modal-edit", {
    props: {reg_air_service:WWW_RegAirService},
    template: "#modal-template",
    data() {
        return {            
            errors: [],
            //aC : this.actioncontent,
            
            //regAirService: {...this.regAirService, RegNumber: this.regAirService.RegNumber.trim()}
            //regAirService: this.reg_air_service
            
        };
    },
    methods: {
        checkForm: function (e) {
            this.errors = [];      
      
            if (!this.errors.length) {
              return true;
            }
            e.preventDefault();
        },
        writeRegAirService(){
            if (this.reg_air_service.id > 0)
            {
                this.updateRegAirService();
            } else
            {
                this.createRegAirService();
            }
        },
        createRegAirService() {
            //const {...regAirservice} = this.form;
            console.log('Create: ', this.reg_air_service);

            // this.contacts.push({...contact, id: Date.now(), marked: false});
            // this.form.name = this.form.value = '';

            //
            // this.regAirService.Owner = 1;
            // this.aC.IsActive= true;
            // this.aC.DataArea= "v2";
            // this.aC.OrderKey= 100;
            // this.aC.Context= "v2 ";
            // this.aC.RecVersion = 13;
            // this.aC.ChangeDate = "2021-05-14T09:35:00.000Z";      
            // this.aC.CntSubHdr = '';
            // this.aC.CntFooter = '';
            // this.aC.ImageKey = '';
            // this.aC.IsExStyle = 0;      
            // this.aC.QRUrl='';
            const ret = request('/api/addRegAirService/', 'POST', this.reg_air_service); 
            this.showEdit = false               
        },
        updateRegAirService: function() {    
            //const {...regAirservice} = this.form;
            console.log('Update:', this.reg_air_service);
            //const ret = request(`/api/updateActionContent/${this.aC.id}/`, 'PUT', this.aC);  
        } 
    },
    async mounted() {
       
        var options = {
            debug: 'info',
            modules: {
              toolbar: '#toolbar'
            },
            placeholder: 'Compose an epic...',
            readOnly: true,
            theme: 'snow'
          };
        // var quill = new Quill('#Content', {
        //     modules: { toolbar: true },
        //     theme: 'snow'
        //   });
    }
  });

new Vue({
    el: '#app',
        //router,
    data() {
        return {
            loading: false,
            showEdit: false,
            selectId: 0,
            form: {
                name: '',
                value: ''
            },
            regAirServices: [],
            errors: [],
            //actionContent: {}
        };
    },
    computed: {
        canCreate() {
            return !(this.form.name.trim() === '' || this.form.value.trim() === '');
        }
    },
    methods: {        
        
        markContact(id) {
            // const contact = this.contacts.find(c => c.id === id);
            // contact.marked = true;

        },
        removeContent(id) {
            // this.contacts = this.contacts.filter(c=> c.id === id)
            const ret = request(`/api/deleteActionContent/${id}/`, 'DELETE');    
            console.log('DELETE', ret);

        }
    },
    async mounted() {
        this.loading = true;
        const data = await request('/api/regAirService');
        console.log('RegAir: ', data);
        this.regAirServices = data; //await request('/api/actionContent');
        this.loading = false;
    }
});

async function request(url, method = 'GET', data = null) {
    try {
        const headers = {};
        let body;
        if (data) {
            headers['Content-Type'] = 'application/json';            
            body = JSON.stringify(data);
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return await response.json();
    } catch (e) {
        console.warn('Error:', e.message);
    }
}