// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
contract EMRRegistry {

    struct Patient {
        string id;
        uint age;
        string domicile;
        string gender; 
        uint createdAt;
        address createdBy;
    }

    mapping(uint => Patient) public patients;
    uint public patientCount;

    event PatientRegistered(
        uint patientId,
        string name,
        uint age,
        string domicile,
        string Gender,
        address createdBy
    );

    function registerPatient(
        string memory _id,
        uint _age,
        string memory _domicile,
        string memory _gender
    ) public {

        patients[patientCount] = Patient(
            _id,
            _age,
            _domicile,
            _gender,
            block.timestamp,
            msg.sender
        );

        emit PatientRegistered(
            patientCount,
            _id,
            _age,
            _domicile,
            _gender,
            msg.sender
        );

        patientCount++;
    }

    function getPatient(uint _id)
        public
        view
        returns (
            string memory,
            uint,
            string memory,
            uint,
            address
        )
    {
        Patient memory p = patients[_id];
        return (p.id, p.age, p.domicile, p.createdAt, p.createdBy);
    }
}
