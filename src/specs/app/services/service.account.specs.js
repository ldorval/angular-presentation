(function(){
    "use strict";

    describe("AccountService /app/services/service.account.js", function(){
        var service;

        beforeEach(module("INTACT.Presentation"));

        beforeEach(inject(function(_AccountService_){
            service = _AccountService_;
        }));

        describe("when initializing the account", function(){
            it("should set the account balance to 0", function(){
                expect(service.getBalance()).toEqual(0);
            });
        });

        describe("when depositing money", function(){
            it("should add the amount to the balance", function(){
                service.deposit(230);

                expect(service.getBalance()).toEqual(230);
            });
        });

        describe("when withdrawing money", function(){
            it("should remove the amount from the balance", function(){
                service.deposit(230);
                service.withdraw(100);

                expect(service.getBalance()).toEqual(130);
            });

            it("should not remove the amount from the balance when there is insufficient funds", function(){
                service.deposit(230);
                service.withdraw(250);

                expect(service.getBalance()).toEqual(230);
            });
        });
    });
})();