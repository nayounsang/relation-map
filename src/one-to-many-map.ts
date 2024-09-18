export class OneToManyMap<O = any, M = any> {
    private oneToMany: Map<O, Set<M>>;
    private manyToOne: Map<M, O>;
    constructor() {
      this.oneToMany = new Map<O, Set<M>>();
      this.manyToOne = new Map<M, O>();
    }
    private cleanOneMemoryIfEmpty(o: O) {
      if (this.oneToMany.get(o).size === 0) {
        this.deleteByOne(o);
      }
    }
    private disconnectByMany(m: M) {
      const o = this.manyToOne.get(m);
      this.oneToMany.get(o).delete(m);
      this.cleanOneMemoryIfEmpty(o);
    }
    set(o: O, m: M) {
      if (this.manyToOne.has(m)) {
        this.disconnectByMany(m);
      }
      if (!this.oneToMany.has(o)) {
        this.oneToMany.set(o, new Set<M>());
      }
      this.oneToMany.get(o).add(m);
      this.manyToOne.set(m, o);
    }
    getByOne(o: O) {
      return this.oneToMany.get(o);
    }
    getByMany(m: M) {
      return this.manyToOne.get(m);
    }
    getOneToMany() {
      return this.oneToMany;
    }
    getManyToIne() {
      return this.manyToOne;
    }
    deleteByMany(m: M) {
      const o = this.manyToOne.get(m);
      this.manyToOne.delete(m);
      this.oneToMany.get(o).delete(m);
      this.cleanOneMemoryIfEmpty(o);
    }
    deleteByOne(o: O) {
      this.oneToMany.get(o).forEach((m) => {
        this.manyToOne.delete(m);
      });
      this.oneToMany.delete(o);
    }
    hasOne(o: O) {
      return this.oneToMany.has(o);
    }
    hasMany(m: M) {
      return this.manyToOne.has(m);
    }
    clear() {
      this.oneToMany.clear();
      this.manyToOne.clear();
    }
  }