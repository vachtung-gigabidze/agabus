//import { response } from 'express';
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';
import {ActionContent} from './models.js';

// import VueRouter from 'vue-router';
// import {

// } from './models';

Vue.component('loader', {
    template: ` <div style="display:flex; justify-content:center; align-items: center"
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>`
});

// const routes = [
//     {path: '/', component: './index.html'},
//     {path: '/edit', component: './editAC.html'},
//     {path: '/add', component: './addAC.html'}
// ];

// const router = new VueRouter({
//     routes
// })

//Vue.use(VueRouter);

Vue.component("modal-edit", {
    props: {actioncontent:ActionContent},
    template: "#modal-template",
    data() {
        return {            
            errors: [],
            //aC : this.actioncontent,
            aC: {...this.actioncontent, Name: this.actioncontent.Name.trim()}
            
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
        writeContent(){
            if (this.aC.id > 0)
            {
                this.updateActionContent();
            } else
            {
                this.createContent();
            }


        },
        createContent() {
            // const {...contact} = this.form;
            // this.contacts.push({...contact, id: Date.now(), marked: false});
            // this.form.name = this.form.value = '';

            //
            this.aC.Owner = 1;
            this.aC.IsActive= true;
            this.aC.DataArea= "v2";
            this.aC.OrderKey= 100;
            this.aC.Context= "v2 ";
            this.aC.RecVersion = 13;
            this.aC.ChangeDate = "2021-05-14T09:35:00.000Z";      
            this.aC.CntSubHdr = '';
            this.aC.CntFooter = '';
            this.aC.ImageKey = '';
            this.aC.IsExStyle = 0;      
            this.aC.QRUrl='';
            const ret = request('/api/addActionContent/', 'POST', this.aC); 
            this.showEdit = false               
        },
        updateActionContent: function() {
            //const {...aC} = this.form;
            
            const ret = request(`/api/updateActionContent/${this.aC.id}/`, 'PUT', this.aC);            
            //console.log('update ', JSON.stringify(this.aC));
        }
   
        // whiteSpace: function (a) {
        //     return a.trim();
        // }
    },
    async mounted() {
       // if (this.aC.id !== 0)
       // {
            //this.aC = this.actioncontent;  
          //  this.aC = this.actionContent;
            //this.aC.Action = this.aC.Action.trim();
            //this.aC.Controller = this.aC.Controller.trim();
       //     if (this.aC !== undefined) {
      //      this.aC.Name = this.aC.Name.trim(); }
        // } else {
        //     console.log('dsdsds')
        //     this.aC.Action = 'Show'
        //     this.aC.Controller = 'Content'
        //     this.aC.Name = 'Show'
            
        // }

        //console.log(this.aC);
        var options = {
            debug: 'info',
            modules: {
              toolbar: '#toolbar'
            },
            placeholder: 'Compose an epic...',
            readOnly: true,
            theme: 'snow'
          };
        var quill = new Quill('#Content', {
            modules: { toolbar: true },
            theme: 'snow'
          });
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
            actionContents: [],
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
        const data = await request('/api/actionContent');
        //console.log(data);
        this.actionContents = data; //await request('/api/actionContent');
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