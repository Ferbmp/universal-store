import { mount } from "@vue/test-utils";
import CartItem from "@/components/molecules/CartItem.vue";
import { RouterLinkStub } from "@vue/test-utils";
import StarRating from "@/components/atoms/StarRating.vue";
const productMock = {
  id: 1,
  title: "Sample Product",
  description: "Sample product description",
  image: "https://example.com/sample-image.jpg",
  price: 99.99,
};

describe("CartItem.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CartItem, {
      props: {
        product: productMock,
        quantity: 1,
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          StarRating,
        },
      },
    });
  });

  it("renders the product title, price, and image", () => {
    const title = wrapper.find(".card-title");
    const price = wrapper.find(".card-text");
    const image = wrapper.find(".product-image");

    expect(title.text()).toBe(productMock.title);
    expect(price.text()).toBe("$99.99");
    expect(image.attributes("src")).toBe(productMock.image);
  });

  it("emits the remove event when the remove button is clicked", async () => {
    const removeButton = wrapper.find(".btn-danger");
    await removeButton.trigger("click");
    expect(wrapper.emitted("remove")).toBeTruthy();
    expect(wrapper.emitted("remove")[0]).toEqual([{ product: productMock }]);
  });
});
