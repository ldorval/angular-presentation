(function(angular){
    "use strict";

    angular.module("INTACT.Presentation").service("AccountService", service);

    function service(){
        var account;

        function init(){
            account = { balance: 0 };
        }

        this.getBalance = function(){
            return account.balance;
        };

        this.deposit = function(amount){
            account.balance += amount;
        };

        this.withdraw = function(amount){
            if (account.balance - amount < 0){
                return false;
            }

            account.balance -= amount;
            return true;
        };

        init();
    }
})(window.angular);