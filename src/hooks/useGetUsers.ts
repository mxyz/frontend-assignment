import useAxios from "axios-hooks";
import { useEffect, useMemo, useState } from "react";
import { IUser } from "~/types/IUser";

export interface IDepartmentList {
  [key: string]: IDepartment;
}

export interface IDepartment {
  male: number;
  female: number;
  ageRange: string;
  hair: { [key: string]: number };
  addressUser: { [key: string]: string };
}

const defaultDepartmentData = {
  male: 0,
  female: 0,
  ageRange: "",
  hair: {},
  addressUser: {},
};

const departmentMapper = (departmentData: IDepartment, user: IUser) => {
  const currentDepartmentData = {...departmentData};
  // gender count
  const genderCount = currentDepartmentData[user.gender] + 1;
  // ageRange
  const _ageRange = currentDepartmentData.ageRange
    ? [
        ...currentDepartmentData.ageRange.split("-").map((age) => Number(age)),
        user.age,
      ]
        .sort((a, b) => a - b)
        .slice(0, 2)
        .join("-")
    : user.age.toString(); // should be 1 or 2 length array

  // hair color count
  const _hair = {...currentDepartmentData.hair};
  if (_hair[user.hair.color]) {
    _hair[user.hair.color] += 1;
  } else {
    _hair[user.hair.color] = 1;
  }
  // addresses
  const _addressUser = {
    ...currentDepartmentData.addressUser,
    [user.firstName + user.lastName]: user.address.postalCode,
  };

  return {
    male: user.gender === 'male' ? genderCount : departmentData.male,
    female: user.gender === 'female' ? genderCount : departmentData.female,
    ageRange: _ageRange,
    hair: _hair,
    addressUser: _addressUser,
  };
};

const useGetUsers = () => {
  const [{ data, loading }, refetch] = useAxios(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/users"
  );

  const calculateDepartmentList = (users: IUser[]) => {
    return users.reduce((departmentData, user) => {
      const userDepartment = user.company.department;
      departmentData[userDepartment] = departmentMapper(
        departmentData[userDepartment] || defaultDepartmentData,
        user
      );
      return departmentData;
    }, {} as IDepartmentList);
  };
  
  const departmentList = useMemo(() => {
    if (data?.users) {
      return calculateDepartmentList(data.users);
    }
    return undefined;
  }, [data?.users]);

  return {
    users: data,
    departments: departmentList,
    isLoadingUsers: loading,
    onFetchGetUsers: refetch,
  };
};

export default useGetUsers;
