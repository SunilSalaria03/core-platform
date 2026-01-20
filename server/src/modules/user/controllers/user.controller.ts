import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersService } from '../services';
import { CreateUserDto } from '../dto';
import { CommonUtils } from 'src/common/utils/commonUtils';
import { IApiResponse } from 'src/common/interfaces/apiInterface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto): Promise<IApiResponse> {
    try {
      const user = await this.usersService.create(dto);
      return CommonUtils.responseUtils.success('User created successfully', user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      const errorResponse = CommonUtils.responseUtils.error(error);
      throw new HttpException(errorResponse.response, errorResponse.statusCode);
    }
  }

  @Get()
  async findAll(): Promise<IApiResponse> {
    try {
      const users = await this.usersService.findAll();
      return CommonUtils.responseUtils.success('Users retrieved successfully', users);
    } catch (error) {
      const errorResponse = CommonUtils.responseUtils.error(error);
      throw new HttpException(errorResponse.response, errorResponse.statusCode);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<IApiResponse> {
    try {
      const user = await this.usersService.findById(id);
      return CommonUtils.responseUtils.success('User retrieved successfully', user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      const errorResponse = CommonUtils.responseUtils.error(error);
      throw new HttpException(errorResponse.response, errorResponse.statusCode);
    }
  }
}
