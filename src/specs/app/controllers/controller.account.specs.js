(function(){
    "use strict";

    describe("AccountController /app/controllers/controller.account.js", function(){
        var vm, accountServiceMock, controllers, withdrawSpy;

        beforeEach(module("INTACT.Presentation"));

        beforeEach(inject(function(_$controller_){
            controllers = _$controller_;

            accountServiceMock = {
                deposit: function(){},
                withdraw: function(){},
                getBalance: function(){}
            };

            createController();
        }));

        function createController(){
            vm = controllers("AccountController", {
                AccountService: accountServiceMock
            });
        }

        describe("when depositing money", function(){
            it("should relay to the account service", function(){
                spyOn(accountServiceMock, "deposit");
                vm.transferAmount = 12;
                vm.deposit();

                expect(accountServiceMock.deposit).toHaveBeenCalledWith(12);
            });

            it("should reset the transfer amount after the deposit", function(){
                vm.transferAmount = 12;
                vm.deposit();

                expect(vm.transferAmount).toEqual(0);
            });
        });

        describe("when withdrawing money", function(){
            it("should relay to the account service", function(){
                spyOn(accountServiceMock, "withdraw");
                vm.transferAmount = 12;
                vm.withdraw();

                expect(accountServiceMock.withdraw).toHaveBeenCalledWith(12);
            });

            it("should reset the transfer amount after the withdraw", function(){
                spyOn(accountServiceMock, "withdraw").and.returnValue(true);
                vm.transferAmount = 12;
                vm.withdraw();

                expect(vm.transferAmount).toEqual(0);
            });

            it("should display an error message when the service refuse the transaction", function(){
                spyOn(accountServiceMock, "withdraw").and.returnValue(false);
                vm.transferAmount = 12;
                vm.withdraw();

                expect(vm.error.message).toEqual("Insufficient funds");
            });
        });
    });
})();