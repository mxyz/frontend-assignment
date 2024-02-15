import useAxios from "axios-hooks";
import { useMemo } from "react";
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
  /**
   * LOGIC
   * 1. get current ageRange from object that can be "", "21", "1-40"
   * 2. split it by "-" so it should be [], ["21"], ["1", "40"]
   * 3. change it into number by using Number(age) => [], [21], [1, 40]
   * 4. add current user's age into array too => [35], [21, 35], [1, 40, 35]
   * 5. sort number => [35], [21, 35], [1, 35, 40]
   * 6. slice out index between 0 and 2 => [35], [21, 35], [1, 40]
   * 7. join it with "-"
   */
  const _ageRange = currentDepartmentData.ageRange
    ? [
        ...currentDepartmentData.ageRange.split("-").map((age) => Number(age)),
        user.age,
      ]
        .sort((a, b) => a - b)
        .slice(0, 2)
        .join("-")
    : user.age.toString();

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
