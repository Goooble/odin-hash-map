function LinkedList() {
  let head = null;
  let tail = null;
  let size = 0;

  function removeAt(index){
    if(index >= size || index < 0){
      return "doesnt exist";
    }
    if(index === 0){
      head = head.nextNode;
      size -= 1;
      return
    }
    if(index === size -1){
      pop();
      return
    }
    let prevNode = at(index - 1);
    prevNode.nextNode = prevNode.nextNode.nextNode;
    size -= 1;
  }

  function insertAt(value, index) {
    if (index > size || index < 0) {
      return "doesnt exist";
    }
    if (index === 0) {
      prepend(value);
      return;
    }
    if (index === size) {
      append(value);
      return;
    }
    let prevNode = at(index - 1);
    let currNode = prevNode.nextNode;
    prevNode.nextNode = node(value);
    prevNode.nextNode.nextNode = currNode;
    size += 1;
  }

  function contains(value) {
    let i = head;
    while (i !== null) {
      if (i.value === value) {
        return true;
      }
      i = i.nextNode;
    }
    return false;
  }

  function pop() {
    if (head === null) {
      return "empty list";
    }
    if (head === tail) {
      head = null;
      tail = null;
    } else {
      let toBeTail = at(size - 2);
      tail = toBeTail;
      tail.nextNode = null;
    }
    size -= 1;
  }

  function at(index) {
    if (index >= size || index < 0) {
      return "doesnt exist";
    }
    let item = head;
    for (let i = 0; i < index; i++) {
      item = item.nextNode;
    }
    return item;
  }

  function append(value) {
    if (head === null) {
      head = node(value);
      tail = head;
    } else {
      tail.nextNode = node(value);
      tail = tail.nextNode;
    }
    size += 1;
  }

  function prepend(value) {
    if (head === null) {
      head = node(value);
      tail = head;
    } else {
      let temp = node(value);
      temp.nextNode = head;
      head = temp;
    }
    size += 1;
  }

  function toString() {
    let i = head;
    let string = "";
    while (i !== null) {
      string = string.concat(i.value, " -> ");
      if (i.nextNode === null) {
        string = string.concat("null");
      }
      i = i.nextNode;
    }

    return string;
  }

  function node(value) {
    return { value, nextNode: null };
  }

  return Object.freeze({
    append,
    toString,
    prepend,
    get size() {
      return size;
    },
    get head() {
      return head;
    },
    get tail() {
      return tail;
    },
    at,
    pop,
    contains,
    insertAt,
    removeAt
  });
}

module.exports.LinkedList = LinkedList;
