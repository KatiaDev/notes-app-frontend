import React, { useState } from "react";
import {
  Container,
  Button,
  Textarea,
  Input,
  Text,
  FormControl,
  FormErrorMessage,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { useEffect } from "react";

const initialState = {
  title: "",
  content: "",
  tags: [],
};

const NoteForm = ({
  initialNote = initialState,
  onSubmitCallback,
  showCancelButton = false,
  onClickCancelButton,
}) => {
  const [value, setValue] = useState(initialNote);
  const [tagValue, setTagValue] = useState("");
  const [hasError, setHasError] = useState({ title: false, content: false });

  const handleInputChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    if (e.target.name === "title" && e.target.value === "") {
      setHasError({ ...hasError, title: true });
    } else if (e.target.name === "title" && e.target.value !== "") {
      setHasError({ ...hasError, title: false });
    } else if (e.target.name === "content" && e.target.value === "") {
      setHasError({ ...hasError, content: true });
    } else if (e.target.name === "content" && e.target.value !== "") {
      setHasError({ ...hasError, content: false });
    }
  };

  useEffect(() => {
    console.log("handleTagInputChange: ", tagValue);
    console.log("handleAddTag: ", value);
  });

  const handleTagInputChange = (e) => {
    setTagValue(e.target.value);
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter") {
      setValue({ ...value, tags: [...value.tags, e.target.value] });
      setTagValue("");
    }
  };

  const handleDeleteTag = (e) => {
    console.log("delete target: ", e.currentTarget.name);
    console.log("handle delete!");
    setValue({
      ...value,
      tags: value.tags.filter((item) => {
        return item !== e.currentTarget.name;
      }),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (value.title === "" || value.content === "") {
      if (value.title === "") {
        setHasError({ ...hasError, title: true });
        return;
      }
      if (value.content === "") {
        setHasError({ ...hasError, content: true });
        return;
      }
    }
    onSubmitCallback(value);
  };

  return (
    <Container mb="6">
      {/* <form onSubmit={onSubmit}> */}
      <FormControl isInvalid={hasError.title}>
        {hasError.title && (
          <FormErrorMessage>Title is required.</FormErrorMessage>
        )}
        <Input
          name="title"
          value={value.title}
          onChange={handleInputChange}
          placeholder="Title"
          mb="15px"
          borderColor="blackAlpha.800"
          focusBorderColor="teal.600"
          required
        />
      </FormControl>
      <FormControl isInvalid={hasError.content}>
        {hasError.content && (
          <FormErrorMessage>Content is required.</FormErrorMessage>
        )}
        <Textarea
          value={value.content}
          onChange={handleInputChange}
          name="content"
          placeholder="Details..."
          mb="10px"
          minHeight="400px"
          borderColor="blackAlpha.800"
          focusBorderColor="teal.600"
          required
        />
      </FormControl>
      <Input
        name="tags"
        value={tagValue}
        onChange={handleTagInputChange}
        onKeyDown={handleAddTag}
        placeholder="Type to add..."
        borderColor="blackAlpha.800"
        focusBorderColor="teal.600"
      />
      <Text
        fontSize="xs"
        fontWeight="semibold"
        as="h3"
        lineHeight="tight"
        isTruncated
        pb="10px"
        color="teal"
      >
        Tags let you add keywords to notes, making them easier to find and
        browse.
      </Text>
      <HStack spacing={4} mb="10px">
        {
          value.tags.map((tag) => {
            if(tag?._id){
              return (
                <Tag
                  size="md"
                  key={tag._id}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="pink"
                >
                  <TagLabel>{tag.name}</TagLabel>
                </Tag>
              );
            }
              return (
                <Tag
                  size="md"
                  key={tag}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="pink"
                >
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton name={tag} onClick={handleDeleteTag} />
                </Tag>
              );
            })
          }
      </HStack>
      <Button
        type="submit"
        onClick={onSubmit}
        backgroundColor="teal"
        color="white"
        marginRight="10px"
        border="1px"
        borderRadius="8px"
      >
        Submit
      </Button>
      {showCancelButton ? (
        <Button
          onClick={onClickCancelButton}
          backgroundColor="red.600"
          color="white"
          type="button"
        >
          Cancel
        </Button>
      ) : null}
      {/* </form> */}
    </Container>
  );
};

export default NoteForm;
