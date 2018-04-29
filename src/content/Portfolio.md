# Portfolio of Code

Spencer Collins - Spring 2018 - RAIK 383H: Software Engineering

## Table of Contents

* [Introduction](#introduction)
* [Overview of the project](#overview-of-the-project)
* [1. HTML - Create Account Component](#1--html---create-account-component)
* [2. Javascript - Create Account Component](#2--javascript---create-account-component)
* [3. Controller - Payment](#3--controller---payment)
* [4. Engine - Auth](#4--engine---auth)
* [5. Accessor - PaymentSpring](#5--accessor---paymentspring)

## Introduction

This document outlines 5 chunks of code from a semester-long software engineering project during my Spring semester of my sophomore year at UNL. I deliberately chose code that shows the work that I did on the full stack. The code chunks I have included start with front end (HTML/javascript) and work to the back end (C#). While this project was done in groups of 4 students, the code highlighted here was all written by me.

## Overview of the project

This project was designed to expose us to good practices in software engineering and to give us some experience working on a team developing software in a somewhat agile method.

This project was sponsored by Nelnet. They asked for us to develop a website where families could go to pay their students' tuition and where school administrators could go to view and download reports of the transaction history, late payment information, etc.

The stack for this project included a C# .NET backend with a 4-tiered layered architecture: Core, Accessors, Engines, and Web. We also included a Tests project for all of our unit testing and integration testing. At the point of our final code turn-in, we were sitting at 92.34% code coverage. The Web layer included an API created by `ApiController`s. The UI was created using KnockoutJS for handling data and reactive page interaction, PagerJS for handling routing and enabling us to develop the website as a single page application, and Bootstrap 4 for styling.

All of our payments were set up using PaymentSpring, a payment processor created by Nelnet. Our timed jobs like charging customers was handled using Hangfire. SMS messaging for notifications was handled using Twilio.

## 1. HTML - Create Account Component

### 1.1 Source

[`NelnetProject/Web/Nelnet_UI/source/CreateAccountComponent/create-account-component.html`](https://github.com/allisoninman/raik383hg1/blob/master/NelnetProject/Web/Nelnet_UI/source/CreateAccountComponent/create-account-component.html)

### 1.2 Code snippet

```html {.line-numbers}
...
<h4 class="mb-3">Student(s)</h4>
<div class="mb-3">Please give us some information about the students you are registering.</div>
<!-- ko foreach: studentInformation -->
<div class="card mb-3">
    <div class="card-body row">
        <a class="close top-right" data-bind="click: $parent.removeStudentInformation" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </a>
        <div class="col-md-6 mb-3 mb-3">
            <label data-bind="attr: {'for': 'student-first-name-'+$index()}">First name</label>
            <input type="text"
                    class="form-control"
                    required
                    autocomplete="given-name"
                    data-msg="Student first name is required"
                    data-bind="attr: {'id': 'student-first-name-'+$index(), 'name': 'student-first-name-'+$index()},
                                textInput: $data.firstName">
        </div>
        <div class="col-md-6 mb-3 mb-3">
            <label data-bind="attr: {'for': 'student-last-name-'+$index()}">Last name</label>
            <input type="text"
                    class="form-control"
                    required
                    autocomplete="family-name"
                    data-msg="Student last name is required"
                    data-bind="attr: {'id': 'student-last-name-'+$index(), 'name': 'student-last-name-'+$index()},
                                textInput: $data.lastName">
        </div>
        <div class="col-12 mb-3 mb-3">
            <label data-bind="attr: {'for': 'student-id-'+$index()}">Student ID</label>
            <input type="text"
                    class="form-control"
                    required
                    data-msg="Student ID is required"
                    data-bind="attr: {'id': 'student-id-'+$index(), 'name': 'student-id-'+$index()},
                                textInput: $data.studentId">
        </div>
        <div class="col-12 mb-3 mb-3">
            <label data-bind="attr: {'for': 'student-school-'+$index()}">School</label>
            <select class="custom-select"
                    required
                    data-msg="School is required"
                    data-bind="attr: {'id': 'student-school-'+$index(), 'name': 'student-school-'+$index()},
                                options: $parent.schools,
                                optionsCaption: 'Choose one...',
                                optionsText: 'SchoolName',
                                optionsAfterRender: function(option, item) {
                                    option.value = (item && item.SchoolId != undefined) ? item.SchoolId : '';
                                },
                                value: $data.school"></select>
        </div>
        <!-- ko with: $data.school -->
        <div class="col-12 mb-3 mb-3">
            <label data-bind="attr: {'for': 'student-grade-'+$index()}">Grade</label>
            <select class="custom-select"
                    required
                    data-msg="Student grade is required"
                    data-bind="attr: {'id': 'student-grade-'+$index(), 'name': 'student-grade-'+$index()},
                                options: Grades,
                                optionsCaption: 'Choose one...',
                                optionsText: function(item){
                                    return item.GradeLevel + ' - $' + item.AnnualTuition + ' for the year'
                                },
                                optionsAfterRender: function(option, item) {
                                    option.value = (item && item.GradeId != undefined) ? item.GradeId : '';
                                },
                                value: $parent.grade"></select>
        </div>
        <!-- /ko -->
    </div>
</div>
<!-- /ko -->
<div class="row">
    <div class="col mb-3">
        <button class="btn" data-bind="click: addStudentInformation">
            <i data-feather="plus"></i>
            Add another student
        </button>
    </div>
</div>
<hr class="mb-4">
<h4 class="mb-3">Payment Information</h4>
<div class="mb-3">The payment information that you enter will be encrypted and will never be shared with anyone. You can remove these methods or add new ones later.</div>
<!-- ko foreach: paymentInformation -->
<div class="card mb-3">
    <div class="card-body row">
        <a class="close top-right" data-bind="click: $parent.removePaymentInformation" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </a>
        <div class="col-md-6 mb-3">
            <label data-toggle="tooltip"
                    data-placement="right"
                    title="Full name as displayed on card"
                    data-bind="attr: {'for': 'cc-name-'+$index()}">Name on card</label>
            <input type="text"
                    class="form-control"
                    required
                    autocomplete="cc-name"
                    data-msg="Name on card is required"
                    data-bind="attr: {'id': 'cc-name-'+$index(), 'name': 'cc-name-'+$index()},
                                value: $data.ccName">
        </div>
        <div class="col-md-6 mb-3">
            <label data-bind="attr: {'for': 'cc-number-'+$index()}">Credit card number</label>
            <input type="text"
                    class="form-control"
                    required
                    autocomplete="cc-number"
                    data-rule-creditcard="true"
                    data-rule-number="true"
                    data-msg="Credit card number is required"
                    data-msg-creditcard="Credit card must be valid"
                    data-msg-number="Credit card must be numeric"
                    data-bind="attr: {'id': 'cc-number-'+$index(), 'name': 'cc-number-'+$index()},
                                value: $data.ccNumber">
        </div>
        <div class="col-md-6 mb-3">
            <label data-bind="attr: {'for': 'cc-expiration-month-'+$index()}">Expiration</label>
            <div class="d-flex">
                <div>
                    <input type="text"
                            class="form-control"
                            placeholder="MM"
                            required
                            autocomplete="cc-exp-month"
                            data-rule-number="true"
                            data-rule-range="1,12"
                            data-msg="Expiration month is required"
                            data-msg-number="Must be valid month"
                            data-msg-range="Must be valid month"
                            data-bind="attr: {'id': 'cc-expiration-month-'+$index(), 'name': 'cc-expiration-month-'+$index()},
                                        value: $data.ccExpirationMonth">
                </div>
                <div class="p-1">/</div>
                <div>
                    <input type="text"
                            class="form-control"
                            placeholder="YYYY"
                            required
                            autocomplete="cc-exp-year"
                            data-rule-number="true"
                            data-rule-range="2000,2200"
                            data-msg="Expiration year is required"
                            data-msg-number="Must be valid year"
                            data-msg-range="Must be valid year"
                            data-bind="attr: {'id': 'cc-expiration-year-'+$index(), 'name': 'cc-expiration-year-'+$index()},
                                        value: $data.ccExpirationYear">
                </div>
            </div>
        </div>
        <div class="col-md-3 mb-3">
            <label data-bind="attr: {'for': 'cc-csc-'+$index()}">CSC</label>
            <input type="text"
                    class="form-control"
                    required
                    autocomplete="cc-csc"
                    data-rule-number="true"
                    data-rule-rangelength="3,4"
                    data-msg="Security code is required"
                    data-msg-number="Security code must be numeric"
                    data-msg-rangelength="Security code is either 3 or 4 digits"
                    data-bind="attr: {'id': 'cc-csc-'+$index(), 'name': 'cc-csc-'+$index()},
                                value: $data.ccCsc">
        </div>
    </div>
</div>
<!-- /ko -->
<div class="row">
    <div class="col mb-3">
        <button class="btn" data-bind="click: addPaymentInformation">
            <i data-feather="plus"></i>
            Add another payment option
        </button>
    </div>
</div>
...
```

### 1.3 Comment

This HTML comes from the template for our account creation page. For most users, this is the first page that they will use when interacting with our system. That means that the design and performance of this page acts as the first impression of our system to each new family that will use our system.

This code was selected because it shows off some of the front end and design work that I did on this project.

Most notably, I made use of the [jQuery Validation Plugin](https://jqueryvalidation.org/) to handle all of the form validation on the website. Rather than cluttering the javascript with all of the rules and error messages specific to the input fields, I made use of the html5 data attributes and included this functionality directly on the element in the html. This feature of the jQuery Validation Plugin is actually not included in the documentation. When searching for a way to decrease the coupling between the javascript and the HTML in terms of form validation, I came across [a very helpful article](https://johnnycode.com/2014/03/27/using-jquery-validate-plugin-html5-data-attribute-rules/) which explained how use of the data attributes.

Additionally, this page utilized KnockoutJS quite a bit. The lists of students and payment methods are stored as knockout observable arrays. This allows us to dynamically update the options on the select menu where the user selects which payment method to associate with each student.

I'm also quite proud of the design for this page. I'm a big fan of responsive design, so I made sure each page in our site was responsive for mobile devices. On large screens, this page has a colorful backdrop that takes up the left 1/3 of the page, to make use of the 1/3 principle of design. I wanted the text in that left 1/3 section to be vertically centered, so I had to set the container height to 100% and used flexbox to center everything. Then on smaller screens, the height of that element resorts back to its natural height (so that it doesn't take up the whole screen by default) and it jumps to the top of the page (so that it isn't taking up an awkward, narrow, vertical strip on the screen).

## 2. Javascript - Create Account Component

### 2.1 Source

[`NelnetProject/Web/Nelnet_UI/source/CreateAccountComponent/create-account-component.js`](https://github.com/allisoninman/raik383hg1/blob/master/NelnetProject/Web/Nelnet_UI/source/CreateAccountComponent/create-account-component.js)

### 2.2 Code snippet

```javascript {.line-numbers}
...
// Form submission
self.createNewAccount = function (formElement) {
    self.creatingAccount(true);

    $("#alertContainer").empty();

    if ($(formElement).valid()) {
        if (self.paymentInformation().length === 0) {
            window.scrollTo(0, 0);
            $.notify({
                    // options
                    message: "You must have at least one payment method!"
                },
                {
                    // settings
                    element: "#alertContainer",
                    position: "static",
                    animate: {
                        enter: "",
                        exit: ""
                    },
                    template: `
                    <div data-notify="container" class="col-12 mb-1 rounded-0 alert alert-{0}" role="alert">
                        <button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>
                        <span data-notify="icon"></span>
                        <span data-notify="title">{1}</span>
                        <ul class="m-0" data-notify="message">{2}</ul>
                        <div class="progress" data-notify="progressbar">
                            <div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>
                        </div>
                        <a href="{3}" target="{4}" data-notify="url"></a>
                    </div>`
                });
            self.creatingAccount(false);
            return;
        }
        if (self.studentInformation().length === 0) {
            window.scrollTo(0, 0);
            $.notify({
                    // options
                    message: "You must have at least one student!"
                },
                {
                    // settings
                    element: "#alertContainer",
                    position: "static",
                    animate: {
                        enter: "",
                        exit: ""
                    },
                    template: `
                    <div data-notify="container" class="col-12 mb-1 rounded-0 alert alert-{0}" role="alert">
                        <button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>
                        <span data-notify="icon"></span>
                        <span data-notify="title">{1}</span>
                        <ul class="m-0" data-notify="message">{2}</ul>
                        <div class="progress" data-notify="progressbar">
                            <div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>
                        </div>
                        <a href="{3}" target="{4}" data-notify="url"></a>
                    </div>`
                });
            self.creatingAccount(false);
            return;
        }

        // Tokenize payment information through PaymentSpring
        const publicKey = params.parent.publicKey;

        const paymentInformationFromPaymentSpring = [];
        (function() {
            return $.when.apply(
                undefined,
                self.paymentInformation().map((info, index) => {
                    return $.ajax({
                        url: "https://api.paymentspring.com/api/v1/tokens/jsonp",
                        dataType: "jsonp",
                        data: {
                            "public_api_key": publicKey,
                            "card_number": info.ccNumber(),
                            "card_exp_month": info.ccExpirationMonth(),
                            "card_exp_year": info.ccExpirationYear(),
                            "csc": info.ccCsc(),
                            "card_owner_name": info.ccName()
                        },
                        success: function(data) {
                            paymentInformationFromPaymentSpring[index] = data;
                        }
                    });
                })
            );
        }()).then(function() {
            const paymentInformationTokens = paymentInformationFromPaymentSpring.map((info, index) => {
                if (info.errors != undefined) {
                    window.scrollTo(0, 0);
                    let messages = "";
                    info.errors.forEach((error) => {
                        messages += `<li>${error.message}</li>`;
                    });
                    $.notify({
                            // options
                            title: `<strong>Whoops!</strong><div>Your card ending in ${self.paymentInformation()[index].lastFour()} 
                                gave the following error message${info.errors.length > 1 ? "s" : ""}:</div>`,
                            message: messages
                        },
                        {
                            // settings
                            element: "#alertContainer",
                            position: "static",
                            animate: {
                                enter: "",
                                exit: ""
                            },
                            template: `
                            <div data-notify="container" class="col-12 mb-1 rounded-0 alert alert-{0}" role="alert">
                                <button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>
                                <span data-notify="icon"></span>
                                <span data-notify="title">{1}</span>
                                <ul class="m-0" data-notify="message">{2}</ul>
                                <div class="progress" data-notify="progressbar">
                                    <div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>
                                </div>
                                <a href="{3}" target="{4}" data-notify="url"></a>
                            </div>`
                        });
                    return info;
                }
                return {
                    "cardType": info.card_type,
                    "expirationMonth": info.card_exp_month,
                    "expirationYear": info.card_exp_year,
                    "lastFour": info.last_4,
                    "nameOnCard": info.card_owner_name,
                    "token": info.id,
                    "index": index
                };
            });

            // Check the data to make sure all of the cards were tokenized without error
            if (paymentInformationTokens.some((info) => {
                return info.errors != undefined;
            })) {
                self.creatingAccount(false);
                return;
            }
            if (paymentInformationTokens.length === 0) {
                self.creatingAccount(false);
                return;
            }

            const data = {
                "account": {
                    "nickname": self.nickname(),
                    "email": self.email(),
                    "phone": self.phone(),
                    "password": self.password(),
                    "students": self.studentInformation().map(student => {
                        return {
                            "firstName": student.firstName(),
                            "lastName": student.lastName(),
                            "studentCode": student.studentId(),
                            "studentGrade": student.grade(),
                            "studentSchool": student.school(),
                            "studentPaymentPlan": student.paymentPlan(),
                            "studentPaymentInfo": student.paymentInformation()
                        };
                    })
                },
                "paymentInformationWithTokens": paymentInformationTokens
            };

            // If credit cards are successfully tokenized, send data to our server
            $.ajax({
                type: "POST",
                url: "api/account",
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            }).done(function(data) {
                if (data.Token != null) {
                    // Save the token to localstorage
                    localStorage.setItem("JWT", data.Token);
                    self.updateRole();
                }
                alert("Your account has been created successfully!");
                pager.navigate("/");
            }).fail(function(data) {
                $.notify({
                    message: data.responseJSON ? data.responseJSON.Message : "Something went wrong."
                });
            }).always(function() {
                self.creatingAccount(false);
                feather.replace();
            });
        }.bind(self));
    } else {
        self.creatingAccount(false);
    }
}
...
```

### 2.3 Comment

This javascript comes from the file that backs our account creation page which I highlighted in [the last section](#1-html-create-account-component).

This code was selected because of the complexities of promises/jQuery.Deferred objects that it deals with.

When users come to our site for the first time, they need to enter information about themselves, their students, and their payment information. We decided to make this process be the most versatile and user friendly for new users as we could. We did this by allowing them to enter both as many students as they would like along with as many forms of payment information as they want. They can always go back and add more later, but we wanted to allow this upfront.

This gets complicated by the fact that all of our payment information gets validated by PaymentSpring on the front end before ever being sent down to our server. This created the problem of having an unknown number of asynchronous calls (to PaymentSpring) that needed to then be followed synchronously by another call (this one being down to our server). Adding complexity, the asynchronous calls to PaymentSpring needed to remain identifiable so that we could associate them back to the appropriate students.

This was accomplished using the `jQuery.when()` object to hold onto all of the calls to PaymentSpring and wait until they finished before triggering another function to be called, which is when I send the compiled information down to our server.

In case any of these calls fail, I set up notifications of success and failure using `jQuery.notify`. This is part of a package called [Bootstrap Notify](http://bootstrap-notify.remabledesigns.com/). It utilizes the styling of bootstrap alerts along with the functionality of jQuery, making it very easy to have a consistent error message styling.

## 3. Controller - Payment

### 3.1 Source

[`NelnetProject/Web/Controllers/PaymentController.cs`](https://github.com/allisoninman/raik383hg1/blob/master/NelnetProject/Web/Controllers/PaymentController.cs)

### 3.2 Code snippet

```csharp {.line-numbers}
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Core.AccessorContracts;
using Core.EngineContracts;
using Core.Requests;
using Web.Filters;

namespace Web.Controllers
{
    [JwtAuthentication]
    [RoutePrefix("api/payment")]
    public class PaymentController : BaseApiController
    {
        private readonly IPaymentEngine _paymentEngine;
        private readonly IBillingEngine _billingEngine;
        private readonly IPaymentInformationAccessor _paymentInformationAccessor;

        public PaymentController(IPaymentEngine paymentEngine,
            IBillingEngine billingEngine,
            IPaymentInformationAccessor paymentInformationAccessor)
        {
            _paymentEngine = paymentEngine;
            _billingEngine = billingEngine;
            _paymentInformationAccessor = paymentInformationAccessor;
        }

        // POST api/payment/MakePayment
        [Authorize(Roles = "Family")]
        [Route("MakePayment")]
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]MakePaymentRequest request)
        {
            var accountId = GetAccountId(User);
            // Load PaymentInformation objects for the account
            var paymentInformations =
                _paymentInformationAccessor.GetAllByAccount(accountId).ToList();
            if (paymentInformations == null || paymentInformations.Count == 0)
            {
                return BadRequest("Unable to verify payment information");
            }

            // Ensure that the PaymentInformationId that they wish to use is associated with the account
            var paymentInformationInstance = paymentInformations.FirstOrDefault(paymentInformation =>
                paymentInformation.PaymentInformationId == request.PaymentInformationId);
            if (paymentInformationInstance == null)
            {
                return BadRequest("Unable to verify payment information");
            }

            // Reload in the transaction object so that all numbers come from the server
            var outstandingTransactions =
                _billingEngine.GetCurrentOutstandingPaymentsByAccount(accountId).ToList();
            if (outstandingTransactions.Count == 0)
            {
                return BadRequest("No outstanding payments on record to be paid");
            }

            var transactionToPay = outstandingTransactions.FirstOrDefault(transaction => transaction.ScheduledDate == request.Transaction.ScheduledDate);
            if (transactionToPay == null)
            {
                return BadRequest("Selected outstanding payment appears to have already been paid successfully");
            }

            // Charge the account
            var wasSuccessful = await _paymentEngine.ChargeCustomer(request.PaymentInformationId, transactionToPay);

            if (wasSuccessful)
            {
                return Ok(new
                {
                    Token = JwtManager.UpdateToken(RequestContext.Principal)
                });
            }

            return BadRequest("Payment failed");
        }

    }
}
```

### 3.3 Comment

This C# code is the full PaymentController.cs file. Its primary role is creating an API endpoint which allows families to make payments that are late.

This code was selected because it displays a number of the SOLID principles of object-oriented design.

The most prominent of the principles displayed in this file is the use of dependency injection. The `_paymentEngine`, `_billingEngine`, and `_paymentInformationAccessor` are injected through constructor injection and never actually initialized in this file.

If necessary, it would be possible to completely overhaul the paymentEngine or inject a different version of the IPaymentengine. As long as the IPaymentEngine methods are still implemented, there would be no problems--like the Liskov substitution principle states.

This file also follows the single responsibility principle. Its sole functionality is creating an endpoint for making payments. The verification that happens within this call is all part of that responsibility.

For security purposes, we wanted to avoid using numbers (especially for currency amounts) from the client. This API endpoint validates all of the input, primarily checking that the payment method is associated with the authenticated account. It also repulls all of the numbers from the billing engine so that the user will never be charged for an amount that came from the client.

## 4. Engine - Auth

### 4.1 Source

[`NelnetProject/Engines/AuthEngine.cs`](https://github.com/allisoninman/raik383hg1/blob/master/NelnetProject/Engines/AuthEngine.cs)

### 4.2 Code snippet

```csharp {.line-numbers}
using Core.AccessorContracts;
using Core.EngineContracts;
using System;
using System.Security.Cryptography;

namespace Engines
{
    public class AuthEngine : IAuthEngine
    {
        private readonly IAccountAccessor _accountAccessor;

        public AuthEngine(IAccountAccessor accountAccessor)
        {
            _accountAccessor = accountAccessor;
        }

        public bool HasEmail(string email)
        {
            var account = _accountAccessor.Find(email);
            return account != null;
        }

        // Source: https://stackoverflow.com/a/10402129/7577035
        public bool ValidateLogin(string email, string password)
        {
            var account = _accountAccessor.Find(email);

            // If there is not an account, return false
            if (account == null) return false;

            // Get the saved password and hash combination
            var savedPasswordHash = account.Password;

            // Convert this string to a byte array
            var hashBytes = Convert.FromBase64String(savedPasswordHash);

            // Separate the salt from password
            var salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);

            // Hash the user-submitted password using the saved salt
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            var hash = pbkdf2.GetBytes(20);

            // Compare the hashed passwords, returning true only if they match
            for (var i = 0; i < 20; i++)
            {
                if (hashBytes[i + 16] != hash[i])
                {
                    return false;
                }
            }

            return true;
        }

        public string HashPassword(string password)
        {
            // Create a new salt
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);

            // Hash the password with this new salt
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            var hash = pbkdf2.GetBytes(20);

            // Combine the salt and password
            var hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);
            var savedPasswordHash = Convert.ToBase64String(hashBytes);

            return savedPasswordHash;
        }

        public int GetAccountId(string email)
        {
            var account = _accountAccessor.Find(email);
            return account.AccountId;
        }

        public string GetRole(string email)
        {
            var account = _accountAccessor.Find(email);
            return account.IsAdmin ? "Administrator" : "Family";
        }

    }
}
```

### 4.3 Comment

This C# code is the entirety of our AuthEngine.cs file. Its primary role is handling validation of email/password combinations.

This code was selected because it displays a number of the SOLID principles of object-oriented design.

The most prominent of the principles in this file is the use of dependency injection. The `private readonly IAccountAccessor _accountAccessor` is never actually initialized in this file. Rather, it is injected through constructor injection.

This file was also really fun to code. I loved learning more about how salting and hashing passwords works along with some of the best practices. For example, the algorithm that the library I ended up using implements is one of the most secure algorthms [according to OWASP](https://www.owasp.org/index.php/Password_Storage_Cheat_Sheet#Impose_infeasible_verification_on_attacker).

## 5. Accessor - PaymentSpring

### 5.1 Source

[`NelnetProject/Accessors/PaymentSpringAccessor.cs`](https://github.com/allisoninman/raik383hg1/blob/master/NelnetProject/Accessors/PaymentSpringAccessor.cs)

### 5.2 Code snippet

```csharp {.line-numbers}
...
public class PaymentSpringAccessor : IPaymentProcessorAccessor
{
    private readonly string _base64EncodedPrivateKey;
    private readonly string _baseUri;

    public PaymentSpringAccessor(IAccessorUtility accessorUtility)
    {
        _base64EncodedPrivateKey = accessorUtility.GetPrivateKey();
        _baseUri = accessorUtility.GetBaseUri();
    }

    public async Task<PaymentInformationWithToken> CreateNewCustomerAsync(Account account, PaymentInformationWithToken paymentInformationWithToken)
    {
        using (var client = new HttpClient())
        {
            var uri = $"{_baseUri}/customers";
            var data = new FormUrlEncodedContent(
                new Dictionary<string, string>
                {
                    {"email", account.Email},
                    {"phone", account.Phone},
                    {"token", paymentInformationWithToken.Token}
                }
            );
            client.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", _base64EncodedPrivateKey);
            var response = await client.PostAsync(uri, data);
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                // Use Json.NET to deserialise the response
                var responseInfo = JsonConvert.DeserializeObject<CreateCustomerResponse>(json);
                paymentInformationWithToken.CustomerId = responseInfo.Id;
            }

            return paymentInformationWithToken;
        }
    }
...
```

### 5.3 Comment

This code snippet allows us to take the tokenized version of a user's payment information and create a "customer" with PaymentSpring. For security reasons, tokens can only be used once. Since we plan to charge the users periodically throughout the year, we need to use our private API key to create a record of the users payment information that can be charged more than once.

This code was selected because it demonstrates a number of SOLID principles and is extremely vital to the functionality of our system, which is ultimately to charge users.

The sole responsibility of this file is to send requests to the PaymentSpring API. This class uses constructor dependency injection to get access to the `IAccessorUtility` class. That class connects to the config file where things like the private key and base uri for the PaymentSpring API are stored. If this application is deployed with different configuration, this would allow for different deployments to be on different versions of the PaymentSpring API or have unique accounts with PaymentSpring.

This class also extends the `IPaymentProcessorAccessor`. While this particular class has a name specific to PaymentSpring, the generic interface only pertains to a general payment processor. If anything should change in the future, we could swap out PaymentSpring for a different payment processor.
