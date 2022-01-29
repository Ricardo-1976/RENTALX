import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository ,ICreateSpecificationDTO } from "../ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor(){
    this.specifications=[];
  }

  // Create Specification
  create({name, description}: ICreateSpecificationDTO): void{
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
    console.log(specification);
  }

  // list Specifications
  list(): Specification[] {
    return this.specifications;
  }

findByName(name: string): Specification {
    const specification = this.specifications.find(
    (specification) => specification.name === name);
    return specification;
  }

}

export { SpecificationsRepository }

