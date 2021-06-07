import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';

import { AllAppointments } from './components/Appointments/AllAppointments';
import { CreateAppointment } from './components/Appointments/CreateAppointment';
import { ConfirmedAppointments } from './components/Appointments/ConfirmedAppointments';
import { EditAppointment } from './components/Appointments/EditAppointment';
import { DeleteAppointment } from './components/Appointments/DeleteAppointment';
import { DetailAppointment } from './components/Appointments/DetailAppointment';
import { UnConfirmedAppointments } from './components/Appointments/UnConfirmedAppointments';

import { CustomerList } from './components/Customers/CustomerList';
import { CreateCustomer } from './components/Customers/CreateCustomer';
import { EditCustomer } from './components/Customers/EditCustomer';
import { DeleteCustomer } from './components/Customers/DeleteCustomer';
import { DetailCustomer } from './components/Customers/DetailCustomer';

import { CustomerSupportList } from './components/SupportEmployees/CustomerSupportList';
import { CreateCustomerSupport } from './components/SupportEmployees/CreateCustomerSupport';
import { EditCustomerSupport } from './components/SupportEmployees/EditCustomerSupport';
import { DeleteCustomerSupport } from './components/SupportEmployees/DeleteCustomerSupport';
import { DetailCustomerSupport } from './components/SupportEmployees/DetailCustomerSupport';

import { AddCustomerSupportToAppointment } from './components/CustomerSupportAppointments/AddCustomerSupportToAppointment';
import { DeleteCustomerSupportAppointment } from './components/CustomerSupportAppointments/DeleteCustomerSupportAppointment';

import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>       
        <Route exact path='/' component={AllAppointments} />
        <Route path='/confirmedAppointments' component={ConfirmedAppointments} />
        <Route path='/createAppointment' component={CreateAppointment} />
        <Route path='/deleteAppointment/:id' component={DeleteAppointment} />
        <Route path='/detailAppointment/:id' component={DetailAppointment} />
        <Route path='/editAppointment/:id' component={EditAppointment} />
        <Route path='/unConfirmedAppointments' component={UnConfirmedAppointments} />

        <Route path='/customerList' component={CustomerList} />
        <Route path='/createCustomer' component={CreateCustomer} />
        <Route path='/deleteCustomer/:id' component={DeleteCustomer} />
        <Route path='/detailCustomer/:id' component={DetailCustomer} />
        <Route path='/editCustomer/:id' component={EditCustomer} />  

        <Route path='/customerSupportList' component={CustomerSupportList} />
        <Route path='/createCustomerSupport' component={CreateCustomerSupport} />
        <Route path='/deleteCustomerSupport/:id' component={DeleteCustomerSupport} />
        <Route path='/detailCustomerSupport/:id' component={DetailCustomerSupport} />
        <Route path='/editCustomerSupport/:id' component={EditCustomerSupport} />  

        <Route path='/addCustomerSupportToAppointment/:id' component={AddCustomerSupportToAppointment} />
        <Route path='/deleteCustomerSupportAppointment/:id/:idd' component={DeleteCustomerSupportAppointment} />


        <AuthorizeRoute path='/fetch-data' component={FetchData} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
