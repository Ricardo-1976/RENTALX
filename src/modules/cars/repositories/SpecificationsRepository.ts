import { ISpecificationsRepository ,ICreateSpecificationDTO } from "./ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor(){
    this.specifications=[];
  }

  create({name, description}: ICreateSpecificationDTO): void{
    const specification = new Specification();
  }

}

export{ SpecificationsRepository }

