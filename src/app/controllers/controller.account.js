(function(angular){
    "use strict";

    angular.module("INTACT.Presentation").controller("AccountController", controller);

    function controller(AccountService){
        var vm = this;

        function init(){
            vm.transferAmount = 0;
            vm.error = { message: "" };
            updateBalance();
        }

        function updateBalance(){
            vm.balance = AccountService.getBalance();
        }

        function clearError(){
            vm.error.message = "";
        }

        vm.deposit = function(){
            clearError();
            AccountService.deposit(parseFloat(vm.transferAmount));
            updateBalance();
            vm.transferAmount = 0;
        };

        vm.withdraw = function(){
            clearError();
            if (AccountService.withdraw(parseFloat(vm.transferAmount))){
                updateBalance();
                vm.transferAmount = 0;
            }
            else{
                vm.error.message = "Insufficient funds";
            }
        };

        init();
    }
})(window.angular);