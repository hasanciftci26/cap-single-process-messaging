using {
    Personnels as per,
    Employees  as emp
} from '../db/main';

service MsgSender @(impl : './main-service') {
    entity Personnels as projection on per;

    event sendMessage {
        personnelNo : Personnels:personnelNo;
        firstName   : Personnels:firstName;
        lastName    : Personnels:lastName;
    };
};

service MsgReceiver @(impl : './main-service') {
    entity Employees as projection on emp;
};
