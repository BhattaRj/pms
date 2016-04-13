<!DOCTYPE html>
<html>

<head>
    <base href="/">
    <title>1040NR</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <!-- <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic'> -->
    <!-- Styles -->
    <link rel="stylesheet" href="bower_components/angular-material/angular-material.css" />
    <link rel="stylesheet" href="assets/app.css" />
    <link rel="stylesheet" href="assets/main_styles.css" />
</head>

<body ng-app="ntech" layout="column" ng-controller="BaseController as base" ng-cloak>
    <header></header>
    <div id="main" flex layout="row">
<md-sidenav class="site-sidenav md-sidenav-left md-whiteframe-z2" md-component-id="left" ng-click="ul.toggleList()" aria-label="Show User List" md-is-locked-open="$mdMedia('gt-sm')" flex="20">
    <md-list>
        <md-list-item>
            <md-button ng-click="form1040nr.goto('basic-info')" ng-class="{'selected' : form1040nr.selectedForm.title === 'basic-info' }">
                Basic Info
            </md-button>
        </md-list-item>
        <md-list-item>
            <md-button ng-click="form1040nr.goto('filling-status')" ng-class="{'selected' : form1040nr.selectedForm.title === 'filling-status' }">
                Filling Status
            </md-button>
        </md-list-item>
        <md-list-item>
            <md-button ng-click="form1040nr.goto('exemptions')" ng-class="{'selected' : form1040nr.selectedForm.title === 'exemptions' }">
                Exemptions
            </md-button>
        </md-list-item>
        <md-list-item>
            <md-button ng-click="form1040nr.goto('income')" ng-class="{'selected' : form1040nr.selectedForm.title === 'income' }">
                Income
            </md-button>
        </md-list-item>
        <md-list-item>
            <md-button ng-click="form1040nr.goto('grossincome')" ng-class="{'selected' : form1040nr.selectedForm.title === 'grossincome' }">
                Grossincome
            </md-button>
        </md-list-item>
        <md-list-item>
            <md-button ng-click="form1040nr.goto('taxes')" ng-class="{'selected' : form1040nr.selectedForm.title === 'taxes' }">
                taxes
            </md-button>
        </md-list-item>
        <md-list-item>
            <md-button ng-click="form1040nr.goto('othertaxes')" ng-class="{'selected' : form1040nr.selectedForm.title === 'othertaxes' }">
                Othertaxes
            </md-button>
        </md-list-item>
        <md-list-item>
            <md-button ng-click="form1040nr.goto('payments')" ng-class="{'selected' : form1040nr.selectedForm.title === 'payments' }">
                payments
            </md-button>
        </md-list-item>
    </md-list>
</md-sidenav>



<md-content flex id="content">
    <md-card>
        <md-card-content>
            <div id="view-container">
<h1>Income Effectively Connected With U.S. Trade/ Business</h1>
<form name="income">
    <div layout-gt-sm="row">
        <md-input-container class="md-block" flex-gt-sm>
            <label>Wages, salaries, tips, etc. Attach Form(s) W-2</label>
            <input name="description" ng-model="form.income.all">
        </md-input-container>
        <md-input-container class="md-block" flex-gt-sm>
            <label>Taxable interest</label>
            <input name="description" ng-model="form.income.tax.interest">
        </md-input-container>
    </div>
    <div layout-gt-sm="row">
        <md-input-container class="md-block" flex-gt-sm>
            <label>Tax-exempt interest. Do not include on line 9a</label>
            <input name="description" ng-model="form.income.tax.exempt">
        </md-input-container>
        <md-input-container class="md-block" flex-gt-sm>
            <label>Ordinary dividends</label>
            <input name="description" ng-model="form.income.dividends.ordinary">
        </md-input-container>
    </div>
    <div layout-gt-sm="row">
        <md-input-container class="md-block" flex-gt-sm>
            <label>Qualified dividends (see instructions)</label>
            <input name="description" ng-model="form.income.dividends.qualified">
        </md-input-container>
        <md-input-container class="md-block" flex-gt-sm>
            <label>Taxable refunds, credits, or offsets of state and local income taxes (see instructions)</label>
            <input name="description" ng-model="form.income.taxable_refunds">
        </md-input-container>
    </div>
    <div layout-gt-sm="row">
        <md-input-container class="md-block" flex-gt-sm>
            <label>Scholarship and fellowship grants. Attach Form(s) 1042-S or required statement (see instructions)</label>
            <input name="description" ng-model="form.income.grant">
        </md-input-container>
        <md-input-container class="md-block" flex-gt-sm>
            <label>Business income or (loss). Attach Schedule C or C-EZ (Form 1040)</label>
            <input name="description" ng-model="form.income.business_income">
        </md-input-container>
    </div>
    <md-input-container class="md-block" flex-gt-sm>
        <label>Business income or (loss). Attach Schedule C or C-EZ (Form 1040)</label>
        <input name="description" ng-model="form.income.business_income">
    </md-input-container>
    <div layout-gt-sm="row">
        <md-input-container class="md-block" flex-gt-sm ng-show="form.income.capital_gain_loss_required">
            <label>Capital gain or (loss). Attach Schedule D (Form 1040) if required.</label>
            <input name="description" ng-model="form.income.capital_gain_loss">
        </md-input-container>
        <md-input-container class="md-block" flex-gt-sm>
            <md-checkbox ng-model="form.income.capital_gain_loss_required" ng-init="form.income.capital_gain_loss_required=true" aria-label="Checkbox 1">Check this box,If not required
            </md-checkbox>
        </md-input-container>
    </div>
    <md-input-container class="md-block">
        <label>Other gains or (losses). Attach Form 4797</label>
        <input name="description" ng-model="form.income.gain_loss.others">
    </md-input-container>
    <div layout-gt-sm="row">
        <md-input-container class="md-block" flex-gt-sm>
            <label>IRA distributions</label>
            <input name="description" ng-model="form.income.ira.amount">
        </md-input-container>
        <md-input-container class="md-block" flex-gt-sm>
            <label>Taxable amount (see instructions)</label>
            <input name="description" ng-model="form.income.ira.tax">
        </md-input-container>
    </div>
    <div layout-gt-sm>
        <md-input-container class="md-block" flex-gt-sm>
            <label>Pensions and annuities</label>
            <input name="description" ng-model="form.income.pension.amount">
        </md-input-container>
        <md-input-container class="md-block" flex-gt-sm>
            <label>Taxable amount (see instructions)</label>
            <input name="description" ng-model="form.income.pension.tax">
        </md-input-container>
    </div>
    <div layout-gt-sm="row">
        <md-input-container class="md-block" flex-gt-sm>
            <label>Rental real estate, royalties, partnerships, trusts, etc. Attach Schedule E (Form 1040)</label>
            <input name="description" ng-model="form.income.rent.extra">
        </md-input-container>
        <md-input-container class="md-block" flex-gt-sm>
            <label>Unemployment compensation</label>
            <input name="description" ng-model="form.income.unemployment_compensation">
        </md-input-container>
    </div>
    <div layout-gt-sm="row">
        <md-input-container class="md-block" flex-gt-sm>
            <label>Other income. List type and amount (see instructions)</label>
            <input name="description" ng-model="form.income.other">
        </md-input-container>
        <md-input-container class="md-block" flex-gt-sm>
            <label>Total income exempt by a treaty from page 5, Schedule OI, Item L (1)(e)</label>
            <input name="description" ng-model="form.income.exempt.total">
        </md-input-container>
    </div>
    <md-input-container class="md-block">
        <label>Total income</label>
        <input name="description" ng-model="form.income.total">
    </md-input-container>
</form>
<slider-button></slider-button>

            </div>
        </md-card-content>
    </md-card>
</md-content>
</div>
    <!-- <div id="main" flex layout="row" ui-view></div> -->
    <!-- Dependenceies Library -->
    <script type="text/javascript" src="bower_components/angular/angular.js"></script>
    <script type="text/javascript" src="bower_components/angular-animate/angular-animate.js"></script>
    <script type="text/javascript" src="bower_components/angular-aria/angular-aria.js"></script>
    <script type="text/javascript" src="bower_components/angular-material/angular-material.js"></script>
    <script type="text/javascript" src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
    <!-- App files -->
    <script type="text/javascript" src="app/app.js"></script>
    <script type="text/javascript" src="app/common/directive/header/header.js"></script>

</body>

</html>
