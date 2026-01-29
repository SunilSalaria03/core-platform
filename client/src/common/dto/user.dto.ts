// Need to move this in users module - when build
export interface UserDto {
  id: string;
  email: string;
  name?: string;
  lastName?: string;
  role?: string | number;
};
  