import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
  
  constructor(
    @InjectRepository(Item)
    private readonly imtemsRepository: Repository<Item>
  ) {}

  async create(createItemInput: CreateItemInput) : Promise<Item> {
    const newItem = this.imtemsRepository.create(createItemInput);
    await this.imtemsRepository.save(newItem);
    return newItem;
  }

  async findAll() : Promise<Item[]> {
    return this.imtemsRepository.find();
  }

  async findOne(id: string) {
    const item = await this.imtemsRepository.findOne({ where: { id } });

    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return item
  }

  async update(id: string, updateItemInput: UpdateItemInput) {
    const item = await this.imtemsRepository.preload(updateItemInput);
    await  this.imtemsRepository.save(item);
    return item;
  }

  async remove(id: string) : Promise<Item> {
    const item = await this.findOne(id);
    await this.imtemsRepository.remove( item );
    return {...item, id};
  }
}
