import React from "react";
import { Link } from "react-router-dom";
import { Text, Box, HStack, Tag, TagLabel } from "@chakra-ui/react";

const NoteCard = ({ note }) => {
  return (
    <Link to={`/note/${note._id}`}>
      <Box
        width="400px"
        overflow="hidden"
        padding="12px"
        boxShadow="md"
        borderRadius="8px"
        border="1px"
        marginBottom="12px"
        backgroundColor="ivory"
      >
        <Text
          fontSize="lg"
          marginTop="1"
          fontWeight="semibold"
          as="h3"
          lineHeight="tight"
          isTruncated
        >
          {note.title}
        </Text>

        <Text
          mt="1"
          lineHeight="tight"
          isTruncated
          maxH="50px"
          overflow="hidden"
        >
          {note.content}
        </Text>
        {note.tags ? (
          <HStack spacing={4}>
            {note.tags.map((tag) => (
              <Tag
                size="sm"
                key={tag._id}
                borderRadius="full"
                variant="solid"
                colorScheme="pink"
              >
                <TagLabel>{tag.name}</TagLabel>
              </Tag>
            ))}
          </HStack>
        ) : (
          ""
        )}
      </Box>
    </Link>
  );
};

export default NoteCard;
